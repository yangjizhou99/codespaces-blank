export function Footer() {
  return (
    <footer className="py-10 text-sm text-slate-600">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold">聯絡資訊 Contact</div>
          <div>電話 Tel: 012-345-6789</div>
          <div>地址 Address: 台北市XX區OO路100號</div>
          <div className="mt-3 space-x-3">
            <a href="https://www.instagram.com/" target="_blank">IG</a>
            <a href="https://www.facebook.com/" target="_blank">Facebook</a>
          </div>
        </div>
        <div>
          <div className="font-semibold">Google 地圖 Map</div>
          <iframe
            className="w-full h-40 rounded-xl border"
            src="https://maps.google.com/maps?q=Taipei%20101&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-6 border-t pt-4">© {new Date().getFullYear()} Kodomo</div>
    </footer>
  );
}
