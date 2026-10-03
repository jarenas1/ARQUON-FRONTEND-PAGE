import { nav, site, whatsappHref } from '../../config/site'
import { useSmoothScroll } from '../../lib/smooth-scroll'
import { LogoMark } from '../brand/LogoMark'
import s from './Footer.module.css'

const YEAR = new Date().getFullYear()

/**
 * Pie de página con forma de cajetín: el recuadro de datos que llevan
 * las láminas de un plano arquitectónico.
 */
export function Footer() {
  const { scrollToId } = useSmoothScroll()

  return (
    <footer className={s.footer} data-tone="light">
      <div className="container">
        <div className={s.block}>
          <div className={`${s.cell} ${s.brandCell}`}>
            <span className={s.label}>Proyecto</span>
            <div className={s.brand}>
              <LogoMark strokeWidth={22} detailed className={s.mark} />
              <span className={s.word}>{site.name}</span>
            </div>
          </div>

          <div className={`${s.cell} ${s.sloganCell}`}>
            <span className={s.label}>Lema</span>
            <p className={s.slogan}>
              <span className={s.outline}>{site.sloganParts[0]}</span> {site.sloganParts[1]}
            </p>
          </div>

          <div className={`${s.cell} ${s.navCell}`}>
            <span className={s.label}>Índice</span>
            <ul className={s.list}>
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(item.id)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.cell}>
            <span className={s.label}>Contacto</span>
            <ul className={s.list}>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
              </li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className={s.cell}>
            <span className={s.label}>Estudio</span>
            <ul className={s.list}>
              <li>{site.contact.address}</li>
              <li>{site.contact.hours}</li>
            </ul>
          </div>

          {site.social.length > 0 && (
            <div className={s.cell}>
              <span className={s.label}>Redes</span>
              <ul className={s.list}>
                {site.social.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={`${s.cell} ${s.sheetCell}`}>
            <span className={s.label}>Lámina</span>
            <p className={s.sheet}>
              <span>Hoja 1 de 1</span>
              <span>
                © {YEAR} {site.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
