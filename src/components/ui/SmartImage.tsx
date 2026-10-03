import { useState } from 'react'
import type { ImageAsset } from '../../lib/media'
import { LogoMark } from '../brand/LogoMark'
import s from './SmartImage.module.css'

type Props = {
  image: ImageAsset
  sizes?: string
  className?: string
  /** true para imágenes visibles al cargar (evita lazy-loading). */
  priority?: boolean
}

/**
 * Imagen con carga diferida, aparición suave y un respaldo con el isotipo
 * si la foto no carga (por ejemplo, un enlace roto).
 */
export function SmartImage({ image, sizes = '100vw', className, priority = false }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')

  if (state === 'error') {
    return (
      <div className={`${s.fallback} ${className ?? ''}`} role="img" aria-label={image.alt}>
        <LogoMark strokeWidth={22} className={s.fallbackMark} />
      </div>
    )
  }

  return (
    <img
      className={`${s.img} ${className ?? ''}`}
      data-state={state}
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
      ref={(el) => {
        // Si la imagen ya estaba en caché, onLoad puede no dispararse
        if (el?.complete && el.naturalWidth > 0 && state === 'loading') setState('loaded')
      }}
    />
  )
}
