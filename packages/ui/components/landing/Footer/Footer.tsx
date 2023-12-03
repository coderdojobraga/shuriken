import { SOCIAL_NETWORKS } from "./config";
import { ISocialNetwork } from "./types";

interface Props {
  bgColor: string;
  fgColor: string;
}

export const Footer = ({ bgColor, fgColor }: Props) => (
  <footer className={`bg-${bgColor} text-${fgColor}`}>
    <div className="container mx-auto">
      <div className="mx-2 grid items-center md:grid-cols-3 lg:mx-12 xl:mx-20">
        <div className="order-last flex flex-row justify-center md:order-first md:justify-start">
          <p>&copy; {new Date().getFullYear()} CoderDojo Braga.</p>
        </div>
        <div className="my-8 flex flex-row items-center justify-center gap-12">
          {SOCIAL_NETWORKS.map(
            ({ key, base_url, username, Icon }: ISocialNetwork) => (
              <a
                key={key}
                href={`${base_url}/${username}`}
                className="hover:text-primary text-lg"
                target="_blank"
                rel="noreferrer"
              >
                {Icon}
              </a>
            ),
          )}
        </div>
        <div className="order-first flex flex-row justify-center md:order-last md:justify-end">
          <a className="hover:text-primary" href="/docs/terms-of-service.pdf">
            Termos de Serviço
          </a>
        </div>
      </div>
    </div>
  </footer>
);
