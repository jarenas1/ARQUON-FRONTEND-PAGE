export type Step = {
  title: string
  body: string
  deliverable: string
}

export const steps: Step[] = [
  {
    title: 'Escuchamos',
    body: 'Visitamos el lote, entendemos cómo vives o trabajas y definimos contigo un presupuesto realista.',
    deliverable: 'Programa de necesidades y alcance del proyecto',
  },
  {
    title: 'Diseñamos',
    body: 'Desarrollamos el anteproyecto con plantas, volumetría y renders, y lo ajustamos contigo hasta que lo apruebes.',
    deliverable: 'Anteproyecto, renders y presupuesto estimado',
  },
  {
    title: 'Tramitamos',
    body: 'Preparamos los planos técnicos, los estudios y los documentos para la licencia de construcción ante la curaduría.',
    deliverable: 'Proyecto técnico y licencia de construcción',
  },
  {
    title: 'Construimos',
    body: 'Ejecutamos la obra con nuestro equipo. Cada semana recibes un informe de avance, costos y próximos pasos.',
    deliverable: 'Informes semanales y control de presupuesto',
  },
  {
    title: 'Entregamos',
    body: 'Revisamos cada detalle contigo y te entregamos el proyecto listo para habitar, con planos finales y garantías.',
    deliverable: 'Entrega, planos finales y garantías',
  },
]
