(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t={result:null,selectedTab:`output`};function n(e){try{return new Intl.DateTimeFormat(`ar-OM`,{dateStyle:`medium`,timeStyle:`short`}).format(new Date(e))}catch{return e}}function r(e=``){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function i(e=``){return r(e).split(`
`).map(e=>{let t=e.trim();return t?/^\d+[).،-]/.test(t)?`<li>${t.replace(/^\d+[).،-]\s*/,``)}</li>`:/^[-•]/.test(t)?`<li>${t.replace(/^[-•]\s*/,``)}</li>`:`<p>${t}</p>`:`<br />`}).join(``).replace(/(<li>.*<\/li>)/gs,`<ul>$1</ul>`)}function a(e,t,n=``){return`<article class="metric-card">
    <span>${e}</span>
    <strong>${t}</strong>
    ${n?`<small>${n}</small>`:``}
  </article>`}function o(){if(!t.result){e.innerHTML=`<main class="shell loading"><div class="orb"></div><p>جاري تحميل نتيجة AI SDK...</p></main>`;return}let i=t.result,c=i.usage?`${i.usage.inputTokens??i.usage.promptTokens??`—`} in / ${i.usage.outputTokens??i.usage.completionTokens??`—`} out`:`غير متاح`;e.innerHTML=`
    <main class="shell">
      <section class="hero glass">
        <div class="hero-copy">
          <p class="eyebrow">Hermes × GitHub × Vercel AI SDK</p>
          <h1>تجربة حية: ليلى تشغّل AI SDK وتحوّل النتيجة لصفحة قابلة للمشاركة</h1>
          <p class="intro">${r(i.streamingIntro||`تم توليد هذه التجربة عبر استدعاء فعلي للنموذج.`)}</p>
          <div class="hero-actions">
            <button data-tab="output" class="${t.selectedTab===`output`?`active`:``}">الناتج</button>
            <button data-tab="proof" class="${t.selectedTab===`proof`?`active`:``}">الدليل</button>
            <button data-tab="workflow" class="${t.selectedTab===`workflow`?`active`:``}">طريقة العمل</button>
          </div>
        </div>
        <div class="signal-card">
          <div class="pulse"></div>
          <span>Live SDK Call</span>
          <strong>${r(i.modelId)}</strong>
          <small>${r(i.provider)}</small>
        </div>
      </section>

      <section class="metrics">
        ${a(`وقت التوليد`,`${Math.round(i.durationMs/100)/10}s`,n(i.generatedAt))}
        ${a(`الاستخدام`,c,`من نتيجة AI SDK`)}
        ${a(`الحالة`,r(i.finishReason||`done`),`تم البناء والتحقق`)}
      </section>

      <section class="panel glass">
        ${s(i)}
      </section>
    </main>
  `,document.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{t.selectedTab=e.dataset.tab,o()})})}function s(e){return t.selectedTab===`proof`?`<h2>دليل أنها تجربة فعلية</h2>
      <div class="proof-grid">
        <div><b>SDK</b><span>${r(e.sdk)}</span></div>
        <div><b>Provider</b><span>${r(e.provider)}</span></div>
        <div><b>Model</b><span>${r(e.modelId)}</span></div>
        <div><b>Client Safety</b><span>المفتاح لم يدخل الصفحة — الناتج فقط منشور</span></div>
      </div>
      <pre>${r(JSON.stringify(e.verification,null,2))}</pre>`:t.selectedTab===`workflow`?`<h2>الخط العملي الجديد</h2>
      <ol class="steps">
        <li>أفحص نسخة AI SDK والدكات الحالية بدل الاعتماد على الذاكرة.</li>
        <li>أشغّل النموذج من السيرفر/السكربت بدون كشف المفاتيح.</li>
        <li>أحوّل النتيجة إلى تجربة قابلة للمشاركة على GitHub Pages.</li>
        <li>أتحقق من البناء والرابط قبل أرسله لك.</li>
      </ol>`:`<h2>الناتج المولّد لحسن</h2><div class="ai-output">${i(e.text)}</div>`}fetch(`./result.json`,{cache:`no-store`}).then(e=>{if(!e.ok)throw Error(`Failed to load result.json: ${e.status}`);return e.json()}).then(e=>{t.result=e,o()}).catch(t=>{e.innerHTML=`<main class="shell"><section class="panel glass"><h1>تعذر تحميل التجربة</h1><pre>${r(t.message)}</pre></section></main>`}),o();