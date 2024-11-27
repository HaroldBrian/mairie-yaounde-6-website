import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { email, phone, location } = config.contact_info;
  return (
    <footer className="">
      <div className="container">
        <div className="row border-y border-border py-12">
          <div className="animate md:col-6 lg:col-3">
            <Logo />
            {markdownify(footer_content, "p", "mt-3")}

            <h3 className="h6 mt-5">Réseaux sociaux</h3>
            <div className="mt-3">
              <Social source={social} className="social-icons mt-3" />
            </div>
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Services</h3>
            {/* footer menu */}
            <ul className="mt-5 leading-6 space-y-4">
              {menu.footer_service.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.url}
                    className=" hover:text-primary hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Liens utiles</h3>
            {/* footer menu */}
            <ul className="mt-5 leading-6 space-y-4">
              {menu.footer.map((menu) => (
                <li key={menu.name}>
                  <Link
                    href={menu.url}
                    className=" hover:text-primary hover:underline"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Informations</h3>

            <h3 className="h6 mt-5">Localisation</h3>
            <ul className="mt-3 leading-6 space-y-4">
              <li>{markdownify(location)}</li>
            </ul>

            {(phone || email) && (
              <>
                <h3 className="h6 mt-5">Contacts</h3>
                <ul className="mt-3 leading-6 space-y-2">
                  <li>
                    <Link href={`tel:${phone}`}>{phone}</Link>
                  </li>
                  <li>
                    <Link href={`mailto:${email}`}>{email}</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        {/* copyright */}
        <div className=" py-6 text-center">
          {markdownify(copyright, "p", "footer-copy-write")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
