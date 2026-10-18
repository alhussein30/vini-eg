(() => {
  const B = {
    wa: "201041926876", shown: "01041926876",
    tt: "https://www.tiktok.com/@vini.eg",
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا على واتساب اللون والمقاس، ونأكد معاك الطلب."],
      ["سعر السويتشيرت كام؟", "550 جنيه، حسب المعلن في فيديوهاتنا على تيك توك. ابعتلنا لتأكيد السعر والمتاح."],
      ["الألوان المتاحة؟", "أسود وأبيض ورمادي وبيج وكحلي وعنابي، حسب المتاح وقت الطلب."],
      ["فين بتبيعوا؟", "البيع أونلاين من المنزل، والطلب كله على واتساب."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أطلب من Vini";

  ["#hdWa", "#heroWa", "#priceWa", "#dWa", "#fWa"].forEach((s) => ($(s).href = wa(hello)));
  ["#fTt", "#dTt"].forEach((s) => ($(s).href = B.tt));
  $("#telWa").href = wa(hello); $("#telWa").textContent = B.shown;
  $("#tt").href = B.tt; $("#tt").textContent = "vini.eg";
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");

  $$(".order-btn").forEach((b) => b.addEventListener("click", () => window.open(wa(`أهلاً، عايز أطلب: ${b.dataset.p}\nالمقاس: `), "_blank", "noopener")));

  const q = $("#q"), none = $("#none");
  q.addEventListener("input", () => {
    const t = q.value.trim().toLowerCase(); let n = 0;
    $$(".pc").forEach((p) => { const ok = !t || p.dataset.c.toLowerCase().includes(t); p.style.display = ok ? "" : "none"; if (ok) n++; });
    none.hidden = n > 0;
  });

  const nav = $("#nav"), bg = $("#burger");
  const setMenu = (o) => { nav.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); };
  bg.onclick = () => setMenu(!nav.classList.contains("open"));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    const name = $("#fName").value.trim(), items = $("#fItems").value.trim(), city = $("#fCity").value.trim();
    if (!items) { $("#fErr").textContent = "اكتب اللون والمقاس."; $("#fItems").focus(); return; }
    $("#fErr").textContent = "";
    const lines = ["أهلاً، عايز أطلب:", "", items];
    if (name) lines.push(`الاسم: ${name}`);
    if (city) lines.push(`المحافظة: ${city}`);
    window.open(wa(lines.join("\n")), "_blank", "noopener");
  };

  $$(".pgrid,.swatches").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--d", i * 0.07 + "s")));
  const els = $$(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  } else els.forEach((e) => e.classList.add("in"));

  let started = false;
  const start = () => { if (started) return; started = true; $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready"); };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1500));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  const bar = $("#progress"), header = $(".header");
  let tick = false;
  addEventListener("scroll", () => { if (tick) return; tick = true; requestAnimationFrame(() => { tick = false; const max = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; header.classList.toggle("stuck", scrollY > 30); }); }, { passive: true });

  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest(".btn"); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement("span");
    d.className = "ripple"; d.style.cssText = `inline-size:${s}px;block-size:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.append(d); setTimeout(() => d.remove(), 650);
  });
})();
