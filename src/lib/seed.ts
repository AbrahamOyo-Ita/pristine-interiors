import type { DB } from './types';

/**
 * DEMONSTRATION CONTENT.
 * Products, prices, projects and testimonials below are illustrative samples
 * so the website can be evaluated end-to-end. They are clearly labelled as
 * sample content in the UI and must be replaced with verified business data.
 */
export function seedDB(): DB {
  return {
    products: [
      {
        id: 'p-adire-sofa', slug: 'adire-3-seater-sofa', name: 'Adire 3-Seater Sofa', category: 'sofas',
        price: 865000,
        description:
          'A deep-seated three-seater upholstered in a warm oatmeal linen weave, with feather-wrapped foam cushions and a solid hardwood frame. Designed for everyday family living with a tailored, relaxed silhouette.',
        images: ['/images/sofa-atom.jpg', '/images/living-lugano.webp'],
        stock: 'in-stock', featured: true, published: true, createdAt: '2026-08-14',
      },
      {
        id: 'p-lekki-loveseat', slug: 'nwaniba-linen-loveseat', name: 'Nwaniba Linen Loveseat', category: 'sofas',
        price: 620000,
        description:
          'A compact two-seater for snug rooms and reading corners. Softly rolled arms, kiln-dried frame and stain-resistant linen-blend upholstery in warm beige.',
        images: ['/images/sofa-loveseat.jpg', '/images/sofa-compact.jpg'],
        stock: 'in-stock', featured: true, published: true, createdAt: '2026-09-02',
      },
      {
        id: 'p-eko-bed', slug: 'ibom-walnut-king-bed', name: 'Ibom Walnut King Bed', category: 'beds',
        price: 780000,
        description:
          'A king-size bed with a tall upholstered headboard in ivory weave and a low walnut-stained frame. Quiet, hotel-calm proportions for restful bedrooms.',
        images: ['/images/bed-charles.webp', '/images/bedroom-lux.jpg'],
        stock: 'in-stock', featured: true, published: true, createdAt: '2026-07-21',
      },
      {
        id: 'p-zaria-bed', slug: 'zaria-upholstered-bed', name: 'Zaria Upholstered Bed', category: 'beds',
        price: 940000,
        description:
          'A sculptural scalloped bed frame, fully upholstered to order in your choice of fabric. A statement piece for serene, contemporary bedrooms.',
        images: ['/images/bed-scalloped.webp', '/images/bedroom-elegant.jpg'],
        stock: 'made-to-order', featured: false, published: true, createdAt: '2026-09-18',
      },
      {
        id: 'p-ikoyi-canopy', slug: 'osongama-canopy-bed', name: 'Osongama Canopy Bed', category: 'beds',
        price: 1250000,
        description:
          'An airy four-poster canopy bed with softly curved detailing. Made to order in selected hardwoods and finishes.',
        images: ['/images/bed-canopy.webp', '/images/bedroom-japandi.jpg'],
        stock: 'made-to-order', featured: false, published: true, createdAt: '2026-06-11',
      },
      {
        id: 'p-tafawa-set', slug: 'tafawa-6-seater-dining-set', name: 'Tafawa 6-Seater Dining Set', category: 'dining',
        price: 1150000,
        description:
          'A seven-piece mid-century dining set: solid wood table with six upholstered cushion chairs. Built for long dinners and busy households.',
        images: ['/images/dinset-7pc.jpg', '/images/dining-midcentury.jpg'],
        stock: 'in-stock', featured: true, published: true, createdAt: '2026-08-30',
      },
      {
        id: 'p-pearlcrest-set', slug: 'walnut-4-seater-dining-set', name: 'Walnut 4-Seater Dining Set', category: 'dining',
        price: 890000,
        description:
          'A walnut-top dining set with curved panel-back chairs, an elegant fit for smaller dining rooms and apartments.',
        images: ['/images/dinset-walnut.jpg', '/images/dining-woodtop.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-09-25',
      },
      {
        id: 'p-farmhouse-set', slug: 'farmhouse-dining-set', name: 'Farmhouse Dining Set', category: 'dining',
        price: 720000,
        description:
          'A relaxed farmhouse set with bench seating and upholstered chairs in easy-clean weave. Currently awaiting restock.',
        images: ['/images/dinset-farmhouse.jpg', '/images/dinset-4pc.jpg'],
        stock: 'out-of-stock', featured: false, published: true, createdAt: '2026-05-19',
      },
      {
        id: 'p-aso-chair', slug: 'aso-accent-armchair', name: 'Aso Accent Armchair', category: 'chairs',
        price: 285000,
        description:
          'A warm, enveloping accent chair in slubbed ecru fabric with a gently reclined back, the perfect companion piece beside a sofa or window.',
        images: ['/images/chair-tarah.jpg', '/images/living-cream.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-09-10',
      },
      {
        id: 'p-lowry-swivel', slug: 'lowry-swivel-chair', name: 'Lowry Swivel Chair', category: 'chairs',
        price: 340000,
        description:
          'A mink velvet swivel chair with a low, loungey profile and 360° motion. Adds soft glamour to living rooms and studies.',
        images: ['/images/chair-lowry.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-08-05',
      },
      {
        id: 'p-valley-boucle', slug: 'valley-boucle-accent-chair', name: 'Valley Bouclé Accent Chair', category: 'chairs',
        price: 310000,
        description:
          'A basket-bouclé accent chair with sculpted curves. Upholstered to order in a range of tactile textures.',
        images: ['/images/chair-valley.jpg'],
        stock: 'made-to-order', featured: false, published: true, createdAt: '2026-09-29',
      },
      {
        id: 'p-obalende-table', slug: 'aka-oak-dining-table', name: 'Aka Oak Dining Table', category: 'tables',
        price: 640000,
        description:
          'A solid oak dining table with a hand-finished top that shows off the natural grain. Seats six comfortably; eight on occasion.',
        images: ['/images/dining-woodtop.jpg', '/images/dining-villa.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-07-02',
      },
      {
        id: 'p-abeokuta-sideboard', slug: 'abeokuta-solid-wood-sideboard', name: 'Abeokuta Solid Wood Sideboard', category: 'storage',
        price: 360000,
        description:
          'A solid wood sideboard with hidden adjustable shelving and generous storage for dining rooms, hallways and media walls.',
        images: ['/images/storage-medina.jpg', '/images/storage-curved.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-08-22',
      },
      {
        id: 'p-calabar-cabinet', slug: 'calabar-storage-cabinet', name: 'Calabar Storage Cabinet', category: 'storage',
        price: 295000,
        description:
          'A mid-century profile storage cabinet with adjustable shelves and tapered legs. Clean-lined storage for any room.',
        images: ['/images/storage-vasagle.jpg', '/images/storage-wide.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-06-27',
      },
      {
        id: 'p-nsukka-vases', slug: 'nsukka-ceramic-vase-set', name: 'Nsukka Ceramic Vase Set (3)', category: 'accessories',
        price: 85000,
        description:
          'A trio of hand-finished ceramic vases in warm beige tones. Style with dried grasses or pampas for an effortless earthy finish.',
        images: ['/images/decor-vaseset.jpg', '/images/decor-styling.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-09-15',
      },
      {
        id: 'p-terracotta-vase', slug: 'terracotta-floor-vase', name: 'Terracotta Floor Vase', category: 'accessories',
        price: 65000,
        description:
          'A textured terracotta floor vase with a rustic, sun-baked finish, a grounding sculptural note for corners and shelves.',
        images: ['/images/decor-terracotta.jpg'],
        stock: 'in-stock', featured: false, published: true, createdAt: '2026-10-01',
      },
    ],
    projects: [
      {
        id: 'j-ikoyi-living', slug: 'shelter-afrique-apartment-living-room', title: 'Shelter Afrique Apartment Living Room',
        category: 'living-rooms', location: 'Shelter Afrique, Uyo', cover: '/images/living-beige.jpg',
        images: ['/images/living-beige.jpg', '/images/living-lugano.webp', '/images/living-minimal.jpg'],
        summary:
          'A calm, layered living room in warm neutrals, designed around comfortable seating, natural texture and soft, indirect light.',
        approach:
          'We began with a neutral envelope of cream and espresso, then layered bouclé, linen and stone textures to add depth without colour noise. Furniture was arranged to keep sightlines open and conversation easy.',
        materials: ['Bouclé & linen upholstery', 'Honed stone coffee tables', 'Oak wall panelling', 'Wool-blend rugs'],
        featured: true, published: true, createdAt: '2026-08-18',
      },
      {
        id: 'j-lekki-bedroom', slug: 'nwaniba-master-bedroom', title: 'Nwaniba Master Bedroom',
        category: 'bedrooms', location: 'Nwaniba, Uyo', cover: '/images/bedroom-lux.jpg',
        images: ['/images/bedroom-lux.jpg', '/images/bedroom-elegant.jpg', '/images/bedroom-japandi.jpg'],
        summary:
          'A restful master suite in sand and gold tones, with a tall upholstered headboard as the anchor and warm evening lighting throughout.',
        approach:
          'The brief asked for a hotel-calm retreat. We balanced soft matte walls with subtle metallic accents, dressed the bed in layered neutrals and planned lighting scenes for reading, dressing and rest.',
        materials: ['Upholstered headboard wall', 'Linen & cotton bedding layers', 'Brushed brass lighting', 'Sheer + blackout drapery'],
        featured: true, published: true, createdAt: '2026-09-05',
      },
      {
        id: 'j-vi-office', slug: 'aka-road-law-office', title: 'Aka Road Law Office',
        category: 'offices', location: 'Aka Road, Uyo', cover: '/images/office-japandi.jpg',
        images: ['/images/office-japandi.jpg', '/images/office-dark.jpg', '/images/office-lounge.jpg'],
        summary:
          'A professional workspace that trades corporate grey for warm wood, soft light and a welcoming client lounge.',
        approach:
          'Workstations were planned for focus and acoustic comfort, while the client lounge uses residential-grade furniture to make meetings feel like conversations rather than interrogations.',
        materials: ['White oak panelling & desks', 'Acoustic wall panels', 'Leather & wool lounge seating', 'Biophilic planting'],
        featured: true, published: true, createdAt: '2026-07-12',
      },
      {
        id: 'j-banana-kitchen', slug: 'osongama-family-kitchen', title: 'Osongama Family Kitchen',
        category: 'kitchens', location: 'Osongama, Uyo', cover: '/images/kitchen-wood.jpg',
        images: ['/images/kitchen-wood.jpg', '/images/kitchen-built-in.webp', '/images/kitchen-elle.jpg'],
        summary:
          'A warm wood kitchen with generous storage, an informal breakfast zone and lighting that flatters both cooking and gathering.',
        approach:
          'We combined rich wood cabinetry with light stone worktops to keep the room warm but bright, and zoned the island for prep, seating and display.',
        materials: ['Walnut & oak cabinetry', 'Quartz worktops', 'Integrated appliance column', 'Pendant & task lighting'],
        featured: false, published: true, createdAt: '2026-06-20',
      },
      {
        id: 'j-ikeja-cafe', slug: 'ibom-boutique-cafe', title: 'Ibom Boutique Café',
        category: 'commercial', location: 'Uyo City Centre, Akwa Ibom', cover: '/images/cafe-1.jpg',
        images: ['/images/cafe-1.jpg', '/images/cafe-2.jpg', '/images/cafe-4.jpg'],
        summary:
          'A compact café interior designed for warmth, quick turnover and photo-worthy corners that guests want to share.',
        approach:
          'Durable timber furniture, easy-clean surfaces and layered pendant lighting create a welcoming room that works hard from breakfast to close.',
        materials: ['Solid timber tables & chairs', 'Commercial-grade flooring', 'Warm pendant lighting', 'Display joinery'],
        featured: false, published: true, createdAt: '2026-09-22',
      },
      {
        id: 'j-ajah-duplex', slug: 'eket-road-duplex-transformation', title: 'Eket Road Duplex Transformation',
        category: 'full-transformations', location: 'Eket Road, Uyo', cover: '/images/dining-villa.jpg',
        images: ['/images/dining-villa.jpg', '/images/living-cream.jpg', '/images/bedroom-cozy.jpg', '/images/dining-stylish.jpg'],
        summary:
          'A whole-home transformation: living, dining and bedrooms unified under one calm, warm material palette.',
        approach:
          'Working room by room, we established a single palette of cream, oak and brass, then varied texture and silhouette so each space keeps its own character within a coherent story.',
        materials: ['Oak flooring & joinery', 'Neutral performance fabrics', 'Brass & ceramic accents', 'Custom window treatments'],
        featured: false, published: true, createdAt: '2026-05-30',
      },
    ],
    services: [
      {
        id: 's-residential', slug: 'residential-interior-design', title: 'Residential Interior Design',
        blurb: 'Complete design of homes, from single rooms to whole residences, tailored to how your family actually lives.',
        points: ['Full-room & whole-home design', 'Concept, layout & material boards', 'Furniture, lighting & décor curation', 'Installation & styling day'],
        active: true,
      },
      {
        id: 's-commercial', slug: 'commercial-interior-design', title: 'Commercial Interior Design',
        blurb: 'Offices, cafés, retail and hospitality spaces designed to welcome customers and support your team.',
        points: ['Offices, cafés & retail', 'Brand-led spatial concepts', 'Durable, code-aware specifications', 'Phased fit-out planning'],
        active: true,
      },
      {
        id: 's-space-planning', slug: 'space-planning-styling', title: 'Space Planning & Styling',
        blurb: 'Layout optimisation and finishing touches that make an existing space work harder and feel complete.',
        points: ['Furniture layout optimisation', 'Flow & function analysis', 'Art, rug & accessory styling', 'Shopping list & sourcing'],
        active: true,
      },
      {
        id: 's-furniture-supply', slug: 'furniture-supply', title: 'Furniture Supply',
        blurb: 'Supply of quality furniture pieces from our catalogue, or sourced to your specification and budget.',
        points: ['Curated catalogue pieces', 'Sourcing to specification', 'Delivery & placement', 'After-sales support'],
        active: true,
      },
      {
        id: 's-bespoke', slug: 'bespoke-furniture', title: 'Bespoke Furniture & Custom Pieces',
        blurb: 'One-off pieces made to measure: beds, sofas, storage and tables built for your exact space.',
        points: ['Made-to-measure beds & sofas', 'Custom wardrobes & joinery', 'Fabric & finish selection', 'Craftsmanship guarantees'],
        active: true,
      },
      {
        id: 's-decoration', slug: 'interior-decoration-finishing', title: 'Interior Decoration & Finishing',
        blurb: 'The final layer: paint, wall finishes, window treatments, lighting and accessories that pull a space together.',
        points: ['Paint & wall finish schemes', 'Curtains, blinds & shutters', 'Lighting plans & fixtures', 'Accessory & art curation'],
        active: true,
      },
    ],
    testimonials: [
      {
        id: 't-1', name: 'Sample Client, Mrs. A.', location: 'Uyo',
        quote: 'They listened carefully and turned our living room into a space we never want to leave.',
      },
      {
        id: 't-2', name: 'Sample Client, Mr. O.', location: 'Uyo',
        quote: 'Professional from concept to installation, and the furniture quality is excellent.',
      },
      {
        id: 't-3', name: 'Sample Client, T. B.', location: 'Uyo',
        quote: 'Our café feels warm and welcoming now, customers photograph the corners daily.',
      },
      {
        id: 't-4', name: 'Sample Client, Mrs. E.', location: 'Uyo',
        quote: 'From the first sketch to the final styling, every detail felt considered and personal.',
      },
    ],
    enquiries: [],
    consultations: [],
    sessions: [],
    settings: {
      heroHeadline: 'Designing Spaces That Feel Like Home',
      heroHighlight: 'Spaces',
      heroSub:
        'Pristine Interiors designs timeless interiors and supplies carefully crafted furniture for homes and businesses across Nigeria.',
      featuredProductIds: ['p-adire-sofa', 'p-lekki-loveseat', 'p-eko-bed', 'p-tafawa-set'],
      featuredProjectIds: ['j-ikoyi-living', 'j-lekki-bedroom', 'j-vi-office'],
      showTestimonials: true,
      showServices: true,
    },
  };
}
