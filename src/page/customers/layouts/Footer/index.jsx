function Footer() {
  return (
    <footer className="bg-stone-950">
      <div className="px-[15rem] mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-[1.4rem] leading-none">
              💍
            </div>
            <span className="text-amber-300 text-[2.2rem] font-bold">
              WeddingKPVT
            </span>
          </div>
          <p className="text-white/60 text-[1.4rem] leading-relaxed font-light max-w-xs">
            Nha hang tiec cuoi cao cap tai TP.HCM. Hon 15 nam dong hanh cung
            hang nghin cap doi tren hanh trinh tinh yeu.
          </p>
          <div className="flex gap-3 mt-6">
            {["F", "in", "YT"].map((s) => (
              <div
                key={s}
                className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center text-white/60 text-[1.4rem] hover:border-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white text-[1.4rem] tracking-widest uppercase mb-5">
            Lien ket
          </div>
          <ul className="flex flex-col gap-3 list-none p-0">
            {["Gioi thieu", "Sanh tiec", "Thuc don", "Dich vu", "Lien he"].map(
              (l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/60 text-[1.4rem] no-underline hover:text-amber-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <div className="text-white text-[1.4rem] tracking-widest uppercase mb-5">
            Lien he
          </div>
          <ul className="flex flex-col gap-3 list-none p-0 text-white/60 text-[1.4rem]">
            <li>📞 028 3812 3456</li>
            <li>✉️ info@weddingkpvt.vn</li>
            <li>📍 123 Le Loi, Q.1, TP.HCM</li>
            <li>🕐 08:00 - 22:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 px-[15rem] ">
        <div className=" mx-auto flex flex-wrap justify-between gap-2 text-[1.4rem] text-white">
          <span>2026 WeddingKPVT. All rights reserved.</span>
          <div className="flex gap-4">
            <a
              href="#"
              className="no-underline text-white hover:text-amber-400 transition-colors"
            >
              Chinh sach bao mat
            </a>
            <a
              href="#"
              className="no-underline text-white hover:text-amber-400 transition-colors"
            >
              Dieu khoan su dung
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
