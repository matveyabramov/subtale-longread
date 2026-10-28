import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE_JSON || import.meta.url);
const { chromium } = require('playwright');
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out = process.cwd() + '/artifacts/experiment-calibration';
await mkdir(out, { recursive: true });
const results = [];
for (const [engine, type] of Object.entries({ chromium })) {
 const browser = await type.launch({ headless: true, channel: 'chrome' });
 const context = await browser.newContext();
 const page = await context.newPage();
 const cdp = await context.newCDPSession(page);
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 await page.goto(process.env.QA_URL || 'http://127.0.0.1:4173');
 await page.evaluate(() => { location.hash = 'experiment-target'; });
 await page.locator('#experiment-target').waitFor();
 await page.evaluate(() => document.fonts.ready);
 const read = () => page.evaluate(() => {
  const rect = el => { const r = el.getBoundingClientRect(); return {x:r.x, y:r.y, width:r.width, height:r.height}; };
  const screen = document.querySelector('#experiment-target');
  const cross = screen.querySelector('[data-node-id="10:732"]');
  const dot = screen.querySelector('[data-node-id="10:735"]');
  return { cross:rect(cross), dot:rect(dot), controls:[...screen.querySelectorAll('a,button')].map(rect), styles:[cross,dot].map(el => {const s=getComputedStyle(el);return {animation:s.animationName,transition:s.transitionDuration,opacity:s.opacity,visibility:s.visibility,transform:s.transform};}), stroke:getComputedStyle(cross.querySelector('path')).strokeWidth, animations:screen.getAnimations({subtree:true}).length, layer:rect(document.querySelector('#experiment-layer')), overflow:screen.scrollWidth > screen.clientWidth };
 });
 for (const [width,height,size,dx,dy,angle = 0] of [[390,844,30,324,30.578125],[768,1024,45,480,45],[1440,810,60,528,50],[1920,1080,75,528,50],[844,390,30,324,30.578125,90],[844,390,30,324,30.578125,270],[390,844,30,324,30.578125],[390,724,30,324,30.578125],[390,664,30,324,30.578125]]) {
  await page.setViewportSize({width,height});
  await cdp.send('Emulation.setDeviceMetricsOverride', {width,height,deviceScaleFactor:1,mobile:width<=600 || (width<=1000 && height<=600),screenOrientation:{type:angle===90?'landscapePrimary':angle===270?'landscapeSecondary':'portraitPrimary',angle}});
  await page.evaluate(() => new Promise(requestAnimationFrame));
  const a = await read();
  const center = r => ({x:r.x+r.width/2,y:r.y+r.height/2});
  const c=center(a.cross), d=center(a.dot);
  assert.equal(a.cross.width,size); assert.equal(a.dot.width,size);
  assert.ok(Math.abs(d.x-c.x-dx)<0.1); assert.ok(Math.abs(d.y-c.y-dy)<0.1);
  for (const marker of [a.cross,a.dot]) {
   assert.ok(marker.x>=0 && marker.x+marker.width<=width && marker.y>=0 && marker.y+marker.height<=height);
   for (const control of a.controls) assert.ok(marker.x+marker.width<=control.x || marker.x>=control.x+control.width || marker.y+marker.height<=control.y || marker.y>=control.y+control.height,JSON.stringify({engine,width,height,marker,control}));
  }
  assert.equal(a.layer.height,height); assert.equal(a.animations,0); assert.equal(a.overflow,false);
  assert.ok(a.styles.every(s=>s.opacity==='1' && s.visibility==='visible' && s.animation==='none' && s.transition==='0s' && s.transform==='none'));
  await page.waitForTimeout(150);
  assert.deepEqual(await read(),a);
  await page.getByRole('button',{name:'Не получается?',exact:true}).click();
  assert.deepEqual(await read(),a);
  await page.keyboard.press('Escape');
  assert.deepEqual(await read(),a);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.deepEqual(await read(),a);
  await page.locator('#experiment-target a[href="#experiment-result"]').click();
  await page.locator('#experiment-result a[href="#experiment-target"]').click();
  assert.deepEqual(await read(),a);
  await page.screenshot({path:`${out}/${engine}-${width}x${height}.png`});
  results.push({engine,width,height,angle,dx:d.x-c.x,dy:d.y-c.y,...a});
 }
 assert.deepEqual(errors,[]);
 await browser.close();
}
await writeFile(`${out}/qa.json`, JSON.stringify(results,null,2)+'\n');
console.log(`PASS: ${results.length} viewport cases; help, resize/rotation, return, reduced motion, CTA clearance, no animations/runtime errors.`);
