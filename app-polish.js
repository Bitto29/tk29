(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  document.body.classList.toggle('tf-mobile', window.matchMedia('(max-width: 720px)').matches);

  const panelByTitle = title => $$('.panel').find(p => {
    const t = p.querySelector('.panel-title');
    return t && t.textContent.trim().toLowerCase() === title;
  });
  const entry = $('#entryPanel');
  const flow = panelByTitle('monthly money flow');
  const history = panelByTitle('transaction history');
  if (entry) entry.id = 'entryPanel';
  if (flow) flow.id = 'flowPanel';
  if (history) history.id = 'historyPanel';

  const hero = $('.hero');
  if (hero) {
    const heading = hero.querySelector('h2');
    if (heading) heading.textContent = 'Money, under control.';
    const copy = hero.querySelector('p');
    if (copy) copy.textContent = 'Track tuition income, spending, savings, and the cash you still have left.';
    if (!hero.querySelector('.tf-hero-balance')) {
      const balance = document.createElement('div');
      balance.className = 'tf-hero-balance';
      balance.innerHTML = '<span>Remaining this month</span><strong id="tfHeroAvailable">৳0</strong>';
      const target = hero.querySelector('p') || heading;
      target.insertAdjacentElement('afterend', balance);
    }
  }

  const available = $('#availableTotal');
  const heroAvailable = $('#tfHeroAvailable');
  const syncBalance = () => { if (available && heroAvailable) heroAvailable.textContent = available.textContent; };
  syncBalance();
  if (available && window.MutationObserver) new MutationObserver(syncBalance).observe(available,{childList:true,subtree:true,characterData:true});

  const actions = $('.actions');
  if (actions && !$('#tfToolsBtn')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'tfToolsBtn';
    btn.className = 'tf-tools-btn';
    btn.setAttribute('aria-label','More options');
    btn.textContent = '•••';
    const pop = document.createElement('div');
    pop.id = 'tfToolsPopover';
    pop.className = 'tf-tools-popover';
    pop.innerHTML = '<button type="button" id="tfExport">Export backup</button><button type="button" id="tfImport">Import backup</button>';
    actions.append(btn,pop);
    btn.addEventListener('click',e=>{e.stopPropagation();pop.hidden=!pop.hidden});
    $('#tfExport').addEventListener('click',()=>{$('#exportBtn')?.click();pop.hidden=true});
    $('#tfImport').addEventListener('click',()=>{$('#importBtn')?.click();pop.hidden=true});
    document.addEventListener('click',e=>{if(!e.target.closest('#tfToolsPopover')&&!e.target.closest('#tfToolsBtn'))pop.hidden=true});
    pop.hidden=true;
  }

  if ($('main') && !$('.tf-bottom-nav')) {
    const nav=document.createElement('nav');
    nav.className='tf-bottom-nav';
    nav.setAttribute('aria-label','App navigation');
    nav.innerHTML='<button type="button" data-target="top" class="active"><span class="tf-nav-icon">⌂</span><small>Home</small></button><button type="button" data-target="entryPanel" class="tf-add"><span class="tf-nav-icon">＋</span><small>Add</small></button><button type="button" data-target="flowPanel"><span class="tf-nav-icon">◔</span><small>Flow</small></button><button type="button" data-target="historyPanel"><span class="tf-nav-icon">≡</span><small>Activity</small></button>';
    document.body.appendChild(nav);
    $$('.tf-bottom-nav button').forEach(button=>{
      button.addEventListener('click',()=>{
        $$('.tf-bottom-nav button').forEach(b=>b.classList.remove('active'));
        button.classList.add('active');
        const target=button.dataset.target;
        if(target==='top'){window.scrollTo({top:0,behavior:'smooth'});return}
        const el=document.getElementById(target);
        if(!el)return;
        window.scrollTo({top:el.offsetTop-70,behavior:'smooth'});
        if(target==='entryPanel')setTimeout(()=>$('#person')?.focus({preventScroll:true}),350);
      });
    });
  }

  const mq=window.matchMedia('(max-width: 720px)');
  const apply=()=>document.body.classList.toggle('tf-mobile',mq.matches);
  mq.addEventListener?.('change',apply);
})();