import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Est-ce que je garde le contrôle de mon appartement ?',
    a: 'Absolument. Vous pouvez bloquer des dates quand vous souhaitez occuper ou prêter votre bien. Vous restez propriétaire et décideur — L\'HÔTE gère, vous approuvez.',
  },
  {
    q: 'Combien ça coûte ?',
    a: 'Notre commission est prélevée sur les revenus générés. Pas de frais fixes, pas de bonne surprise : vous ne payez que quand votre appartement rapporte. Contactez-nous pour un devis personnalisé.',
  },
  {
    q: 'Combien de temps pour lancer ?',
    a: 'Comptez 2 à 3 semaines entre le diagnostic initial et la mise en ligne de votre annonce optimisée. Le shooting et la préparation déco se font en parallèle.',
  },
  {
    q: 'Et si j\'ai déjà une annonce Airbnb existante ?',
    a: 'Parfait, nous l\'optimisons depuis l\'intérieur. Nouveau titre, nouvelles photos, nouvelle description, tarification ajustée. La plupart de nos clients voient une différence dès les 30 premiers jours.',
  },
  {
    q: 'Qui s\'occupe du ménage ?',
    a: 'Notre équipe de ménage professionnelle intervient après chaque départ, avant chaque arrivée. Linge hôtelier fourni et lavé. Vous ne gérez rien, nous contrôlons la qualité à chaque rotation.',
  },
  {
    q: 'Couvrez-vous tout Paris ?',
    a: 'Nous gérons des appartements dans tous les arrondissements. Nous sommes particulièrement bien implantés dans les 1er au 11e, Montmartre, le Marais et les quartiers à forte demande touristique.',
  },
  {
    q: 'Que se passe-t-il si un voyageur casse quelque chose ?',
    a: 'Airbnb fournit une protection hôte (AirCover). En parallèle, nous documentons l\'état du logement avant chaque arrivée et gérons les réclamations en votre nom. Votre appartement est entre de bonnes mains.',
  },
  {
    q: 'Comment ça se passe pour la conformité légale ?',
    a: 'Nous assurons le suivi du compteur de nuits (90 nuits/an pour une résidence principale à Paris), l\'affichage du numéro d\'enregistrement sur l\'annonce, et vous fournissons un récapitulatif fiscal annuel.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      style={{
        background: '#F2EDE3',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9C7C46',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Questions fréquentes
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1B2A4A',
              lineHeight: 1.1,
            }}
          >
            Tout ce que vous voulez savoir
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #C8BDA5',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.4rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: '#1B2A4A',
                    lineHeight: 1.3,
                    flex: 1,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: '#9C7C46',
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    display: 'inline-block',
                    transform: open === i ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  ►
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    paddingBottom: '1.4rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.92rem',
                      fontWeight: 300,
                      color: '#7A8696',
                      lineHeight: 1.75,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
