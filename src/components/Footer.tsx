const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground section-padding py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-extrabold text-primary mb-4">
            SignTales
          </h3>
          <p className="text-primary-foreground/60 font-body max-w-sm">
            Giúp ngôn ngữ ký hiệu trở nên dễ tiếp cận, trực quan và hấp dẫn với mọi người.
            Từng cử chỉ một.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-primary-foreground/80">Nền tảng</h4>
          <ul className="space-y-2 text-primary-foreground/50 font-body text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Học tập</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cộng đồng</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Liên hệ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4 text-primary-foreground/80">Kết nối</h4>
          <ul className="space-y-2 text-primary-foreground/50 font-body text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-primary-foreground/10">
        <p className="text-primary-foreground/40 text-sm font-body text-center">
          © 2026 SignTales. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
};

export default Footer;