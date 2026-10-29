const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const preview = process.env.QA_PREVIEW_URL || 'http://127.0.0.1:4174';
const origin='https://matveyabramov.github.io';
const search='?utm_source=dzen&utm_medium=article&utm_campaign=subtale_launch&utm_content=post_01';
for(const engine of ['chrome','webkit']) for(const width of [1440,390]) {
 const browser=await (engine==='chrome'?chromium:webkit).launch(engine==='chrome'?{channel:'chrome',headless:true}:{headless:true,...(process.env.QA_WEBKIT_EXECUTABLE ? {executablePath:process.env.QA_WEBKIT_EXECUTABLE} : {})});
 const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:width===1440?'reduce':'no-preference',hasTouch:width===390});
 await ctx.route(origin+'/**',async route=>{const u=new URL(route.request().url());const res=await fetch(preview+u.pathname.replace('/subtale-longread','')+u.search);await route.fulfill({status:res.status,headers:{'content-type':res.headers.get('content-type')||''},body:Buffer.from(await res.arrayBuffer())});});
 await ctx.route('https://mc.yandex.ru/**',r=>r.abort());
 await ctx.addInitScript(()=>{window.calls=[];window.ym=(...args)=>window.calls.push(args);});
 const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const goals=()=>p.evaluate(()=>window.calls.filter(c=>c[1]==='reachGoal'));
 await p.goto(origin+'/subtale-longread/'+search,{waitUntil:'networkidle'});
 assert.equal(await p.evaluate(()=>window.calls.filter(c=>c[1]==='init').length),1);
 assert((await p.evaluate(()=>window.calls[0][2].url)).includes(search));
 assert.equal((await goals()).length,0);
 // Actual link activation; initial hero intro is allowed to finish under reduced motion.
 await p.locator('a[href="#experiment-instructions"]').first().click({force:true});
 await p.waitForSelector('#experiment-instructions');
 await p.locator('a[href="#experiment-target"]').click();
 await p.locator('a[href="#experiment-result"]').click();
 await p.waitForSelector('#experiment-result');
 await p.goBack();await p.goForward();
 await p.locator('#experiment-result a[href="#emptiness"]').click();
 await p.waitForTimeout(150);
 for(const g of ['experiment_start','experiment_attempt','experiment_result','reading_start'])assert.equal((await goals()).filter(c=>c[2]===g).length,1,g);
 assert(!(await goals()).some(c=>c[2]==='experiment_skip'));
 assert.equal(new URL(p.url()).search,search);
 // Focus and repeated category activation are not selections.
 await p.locator('#explorer-tab-pun').focus();
 assert(!(await goals()).some(c=>c[2]==='explorer_select'));
 await p.locator('#explorer-tab-pun').click({force:true});
 await p.locator('#explorer-tab-pun').click({force:true});
 assert.equal((await goals()).filter(c=>c[2]==='explorer_select').length,1);
 await p.locator('[data-explorer-reveal]').focus();await p.keyboard.press('Enter');
 assert.equal((await goals()).filter(c=>c[2]==='explorer_reveal').length,0);
 for (const category of ['doubleMeaning','reference','idiom']) {
   await p.locator('#explorer-tab-'+category).click({force:true});
   assert.deepEqual((await goals()).filter(c=>c[2]==='explorer_select').at(-1)[3],{category});
 }
 const beforeHover=(await goals()).filter(c=>c[2]==='explorer_reveal').length;
 await p.locator('[data-explorer-reveal]').hover({force:true});
 assert.equal((await goals()).filter(c=>c[2]==='explorer_reveal').length,beforeHover);
 if(width===390) {
   await p.locator('[data-explorer-reveal]').tap({force:true});
   assert.equal((await goals()).filter(c=>c[2]==='explorer_reveal').length,beforeHover);
 }
 for(const category of ['idiom','pun','doubleMeaning','reference','reference']) {
   await p.locator('#explorer-tab-'+category).click({force:true});
   const before=(await goals()).filter(c=>c[2]==='explorer_reveal').length;
   await p.locator('button[aria-controls="explorer-explanation"]').click({force:true});
   await p.waitForSelector('#explorer-explanation[open]');
   const reveals=(await goals()).filter(c=>c[2]==='explorer_reveal');
   assert.equal(reveals.length,before+1);
   assert.deepEqual(reveals.at(-1),[113892269,'reachGoal','explorer_reveal',{category}]);
   await p.getByRole('button',{name:'Закрыть объяснение',exact:true}).click();
   await p.waitForSelector('#explorer-explanation',{state:'detached'});
   assert.equal((await goals()).filter(c=>c[2]==='explorer_reveal').length,before+1);
 }
 await p.locator('#movie-airplane button').hover({force:true});await p.waitForTimeout(250);
 assert(!(await goals()).some(c=>c[2]==='movie_video_play'));
 await p.locator('#movie-airplane button').click({force:true});
 await p.waitForSelector('#movie-analysis[open]');
 assert.deepEqual((await goals()).find(c=>c[2]==='movie_analysis_open')[3],{movie_id:'airplane'});
 assert(!(await goals()).some(c=>c[2]==='movie_video_play'));
 const depthsBefore=(await goals()).filter(c=>['read_50','read_75','footer_reached'].includes(c[2]));
 await p.locator('#movie-analysis').evaluate(e=>e.scrollTo(0,e.scrollHeight));
 await p.waitForTimeout(100);
 assert.deepEqual((await goals()).filter(c=>['read_50','read_75','footer_reached'].includes(c[2])),depthsBefore);
 await p.locator('#movie-analysis video').scrollIntoViewIfNeeded();
 // Real playback, not a synthetic play event.
 await p.getByRole('button',{name:'Смотреть сцену'}).click();
 await p.waitForFunction(()=>window.calls.some(c=>c[2]==='movie_video_play'),null,{timeout:15000});
 await p.getByRole('button',{name:'Закрыть разбор',exact:true}).click();
 await p.evaluate(()=>document.getElementById('footer').scrollIntoView());await p.waitForTimeout(250);
 for(const g of ['read_50','read_75','footer_reached'])assert.equal((await goals()).filter(c=>c[2]===g).length,1,g);
 assert.equal(new URL(p.url()).search,search);
 await p.locator('button[aria-controls="contents-panel"]').click({force:true});
 await p.locator('#contents-panel a[href="#vocab"]').click();
 assert.equal(new URL(p.url()).search,search);
 assert.equal(new URL(p.url()).hash,'#vocab');
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({engine,width,goals:await goals(),errors}));
 // Fresh load: skip is distinct from result; per-page dedup resets.
 await p.goto(origin+'/subtale-longread/'+search+'&qa=skip#experiment-instructions',{waitUntil:'networkidle'});
 await p.locator('a[data-node-id="10:729"]').click();await p.waitForTimeout(150);
 assert((await goals()).some(c=>c[2]==='experiment_skip'));
 assert(!(await goals()).some(c=>c[2]==='experiment_result'));
 // Localhost never initializes, even with an injected ym.
 await p.goto(preview+'/'+search,{waitUntil:'networkidle'});
 assert.equal(await p.evaluate(()=>window.calls.length),0);
 // Absent ym: official queue initializes once and survives a blocked loader.
 await ctx.newPage().then(async page => {
   await page.addInitScript(() => { delete window.ym; });
   await page.goto(origin+'/subtale-longread/'+search,{waitUntil:'networkidle'});
   assert.equal(await page.evaluate(()=>window.ym.a.filter(c=>c[1]==='init').length),1);
   assert.equal(await page.locator('script[src*="metrika/tag.js"]').count(),1);
   await page.locator('a[href="#experiment-instructions"]').first().click({force:true});
   await page.waitForSelector('#experiment-instructions');
 });
 // LAN hostname cannot initialize, even when serving the production bundle.
 await ctx.route('http://192.168.1.25/**',async route=> {
   const u=new URL(route.request().url()); const r=await fetch(preview+u.pathname+u.search);
   await route.fulfill({status:r.status,headers:{'content-type':r.headers.get('content-type')||''},body:Buffer.from(await r.arrayBuffer())});
 });
 await p.goto('http://192.168.1.25/'+search,{waitUntil:'networkidle'});
 assert.equal(await p.evaluate(()=>window.calls.length),0);
 console.log(JSON.stringify({engine,width,skip:true,localhostExcluded:true,lanExcluded:true,blockedWithoutYm:true}));
 await browser.close();
}
