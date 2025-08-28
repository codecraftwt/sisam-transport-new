import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Testimonials.css';
import { TESTI_IMG_1, TESTI_IMG_2, TESTI_IMG_3, TESTI_IMG_4, TESTI_IMG_5 } from '../../assets/testimonials/Images';

gsap.registerPlugin(useGSAP);

const baseImageUrl = 'https://images.unsplash.com/photo';

const defaultItems = [
  {
    common: 'Great service and support',
    binomial: 'Operations Director, Acme Logistics',
    photo: { code: '', page: '', text: 'Client testimonial', pos: '50% 50%', by: 'Client', customSrc: TESTI_IMG_1 },
  },
  {
    common: 'On-time delivery every time',
    binomial: 'Supply Chain Lead, Globex',
    photo: { code: '', page: '', text: 'Client testimonial', pos: '50% 50%', by: 'Client', customSrc: TESTI_IMG_2 },
  },
  {
    common: 'Transparent communication',
    binomial: 'Head of Procurement, Initech',
    photo: { code: '', page: '', text: 'Client testimonial', pos: '50% 50%', by: 'Client', customSrc: TESTI_IMG_3 },
  },
  {
    common: 'Scalable global reach',
    binomial: 'VP Logistics, Umbrella Corp',
    photo: { code: '', page: '', text: 'Client testimonial', pos: '50% 50%', by: 'Client', customSrc: TESTI_IMG_4 },
  },
  {
    common: 'Exceptional reliability',
    binomial: 'COO, Wayne Enterprises',
    photo: { code: '', page: '', text: 'Client testimonial', pos: '50% 50%', by: 'Client', customSrc: TESTI_IMG_5 },
  },
  {
    common: 'Flexible solutions',
    binomial: 'Logistics Manager, Hooli',
    photo: {
      code: '1583499871880-de841d1ace2a',
      page: 'lion-lying-on-brown-rock-MUeeyzsjiY8',
      text: 'backup image if custom fails',
      pos: '47% 35%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Asiatic elephant',
    binomial: 'Elephas maximus',
    photo: {
      code: '1571406761758-9a3eed5338ef',
      page: 'shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4',
      text: 'herd of Sri Lankan elephants walking away from a river',
      pos: '75% 65%',
      by: 'Alex Azabache'
    }
  },
  {
    common: 'Red-tailed black cockatoo',
    binomial: 'Calyptorhynchus banksii',
    photo: {
      code: '1619664208054-41eefeab29e9',
      page: 'black-and-brown-bird-in-close-up-photography-LkrOEupiVt8',
      text: 'close-up of a black cockatoo',
      pos: '53% 43%',
      by: 'David Clode'
    }
  },
  {
    common: 'Dromedary',
    binomial: 'Camelus dromedarius',
    photo: {
      code: '1662841238473-f4b137e123cb',
      page: 'a-group-of-camels-in-a-desert-uIzCnO-gOrw',
      text: 'camel and her new born calf walking in the Sahara desert',
      pos: '65% 65%',
      by: 'Moaz Tobok'
    }
  },
  {
    common: 'Polar bear',
    binomial: 'Ursus maritimus',
    photo: {
      code: '1589648751789-c8ecb7a88bd5',
      page: 'polar-bear-on-snow-covered-ground-during-daytime-AZ31hv9kdzE',
      text: 'polar bear on the snow, by the water, raised on the hind legs, front paws together',
      pos: '50% 25%',
      by: 'Hans-Jurgen Mager'
    }
  },
  {
    common: 'Waterbuck',
    binomial: 'Kobus ellipsiprymnus',
    photo: {
      code: '1662187554571-f54ea9657d88',
      page: 'a-deer-with-antlers-in-a-field-jVvl_2cQO5s',
      text: 'waterbuck in a field, looking at the camera',
      pos: '47%',
      by: 'Jonathan Gensicke'
    }
  },
  {
    common: 'Giant panda',
    binomial: 'Ailuropoda melanoleuca',
    photo: {
      code: '1659540181281-1d89d6112832',
      page: 'a-panda-bear-in-a-tree-e0mrn3XDatU',
      text: 'giant panda hanging from a tree branch',
      pos: '47%',
      by: 'Jiachen Lin'
    }
  },
  {
    common: "Grévy's zebra",
    binomial: 'Equus grevyi',
    photo: {
      code: '1526095179574-86e545346ae6',
      page: 'zebra-standing-on-wheat-field-ZqYPM8i60F8',
      text: 'zebra standing on wheat field, looking back towards the camera',
      pos: '65% 35%',
      by: 'Jeff Griffith'
    }
  },
  {
    common: 'Cheetah',
    binomial: 'Acinonyx jubatus',
    photo: {
      code: '1541707519942-08fd2f6480ba',
      page: 'leopard-sitting-on-grass-field-3pekyY0-yOw',
      text: 'cheetah sitting in the grass under a blue sky',
      by: 'Mike Bird'
    }
  },
  {
    common: 'King penguin',
    binomial: 'Aptenodytes patagonicus',
    photo: {
      code: '1595792419466-23cec2476fa6',
      page: 'white-and-black-penguin-on-gray-rock-o4snRPEZRRs',
      text: 'king penguin with a fluffy brown chick on grey rocks',
      pos: '35%',
      by: 'Martin Wettstein'
    }
  },
  {
    common: 'Red panda',
    binomial: 'Ailurus fulgens',
    photo: {
      code: '1689799513565-44d2bc09d75b',
      page: 'a-red-panda-is-sitting-in-a-tree-oVNDSIUQrdc',
      text: 'a red panda in a tree',
      by: 'Niels Baars'
    }
  },
  {
    common: 'Leopard',
    binomial: 'Panthera pardus',
    photo: {
      code: '1651611136918-a8a2f8bba419',
      page: 'a-leopard-lying-on-a-rock-VDESlNV85qE',
      text: 'pensive young leopard on a rock',
      pos: '43% 47%',
      by: 'Andy Silby'
    }
  },
  {
    common: 'Hyacinth macaw',
    binomial: 'Anodorhynchus hyacinthinus',
    photo: {
      code: '1624210146024-1046a266038e',
      page: 'blue-and-yellow-macaw-on-brown-tree-branch-during-daytime-wKFd2EhyRAY',
      text: 'two hyacinth macaws on a tree branch',
      pos: '65% 35%',
      by: 'Juliana e Mariana Amorim'
    }
  },
  {
    common: 'Red kangaroo',
    binomial: 'Osphranter rufus',
    photo: {
      code: '1567600868213-60eb570ae39f',
      page: 'brown-kangaroo-eziyddL2OR4',
      text: 'kangaroo in the grass',
      by: 'Jordyn Montague'
    }
  },
  {
    common: 'Snow leopard',
    binomial: 'Panthera uncia',
    photo: {
      code: '1639231554431-ebce02bdeacc',
      page: 'a-snow-leopard-sitting-on-top-of-a-rock-JXECZL83E6M',
      text: 'snow leopard sitting on top of a rock, its big fluffy tail hanging down',
      pos: '50% 25%',
      by: 'Simon Schwyter'
    }
  },
  {
    common: 'Sumatran orangutan',
    binomial: 'Pongo abelii',
    photo: {
      code: '1723979757235-73c4767ced1d',
      page: 'a-close-up-of-a-monkey-with-a-smile-on-its-face-uLkwLM7Uw48',
      text: 'close-up of a pensive male orangutan',
      by: 'Fahrul Razi'
    }
  },
  {
    common: 'Tiger',
    binomial: 'Panthera tigris',
    photo: {
      code: '1500467525088-aafe28c0a95e',
      page: 'selective-focus-of-tiger-laying-on-ground-LNSIGPuZXIg',
      text: 'close-up of a pensive tiger lying on the ground',
      pos: '57%',
      by: 'Frida Lannerström'
    }
  },
  {
    common: 'Brown bear',
    binomial: 'Ursus arctos',
    photo: {
      code: '1692373202439-4b13694c8a68',
      page: 'a-brown-bear-standing-in-the-middle-of-a-forest-ErfqBlV3AEo',
      text: 'brown bear in the forest, sticking tongue out',
      pos: '43% 35%',
      by: 'Alexandru-Bogdan Ghita'
    }
  }
];

const buildItems = (items) =>
  items.map((it) => ({
    ...it,
    desc: it.photo?.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }));

const Testimonials = ({
  items = defaultItems,
  title = 'Infinite scroll circular gallery',
  lead = 'Scroll to explore the gallery. Hover a card to flip and read more.'
}) => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const faceRefs = useRef([]);
  const innerRefs = useRef([]);

  const data = useMemo(() => buildItems(items), [items]);

  let tweenRef = useRef(null);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const faces = faceRefs.current;
      if (!cards?.length || !faces?.length) return;

      const n = cards.length;
      const sample = cards[0];
      const baseWidth = sample.offsetWidth || 180;
      const spacing = 60; // increased gap between images
      const step = 360 / n;

      let radius = Math.round(baseWidth / (2 * Math.tan(Math.PI / n)) + spacing);

      // manual setters to avoid CSSPlugin issues in some environments
      const setCardTransform = cards.map((el) => {
        el.style.willChange = 'transform';
        return (angleDeg, depthPx) => {
          el.style.transform = `translate(-50%, -50%) rotateY(${angleDeg}deg) translateZ(${depthPx}px)`;
        };
      });
      // we leave faces oriented with the ring (angled), like the reference design

      const layout = (theta) => {
        for (let i = 0; i < n; i++) {
          const a = theta + i * step; // current angle
          setCardTransform[i](a, radius);

          // selection factor for styling
          const diff = Math.abs((((a % 360) + 360) % 360) - 0);
          const d = Math.min(diff, 360 - diff); // 0..180
          const sel = Math.max(0, 1 - d / 60); // front ~60deg window
          cards[i].style.setProperty('--sel', sel.toFixed(3));
        }
      };

      // initial layout
      layout(0);

      // continuous rotation using a dummy tween
      const state = { theta: 0 };
      const tween = gsap.to(state, {
        theta: 360,
        duration: 45, // slower rotation
        ease: 'none',
        repeat: -1,
        onUpdate: () => layout(state.theta)
      });
      tweenRef.current = tween;

      const handle = () => {
        const w = cards[0].offsetWidth || baseWidth;
        radius = Math.round(w / (2 * Math.tan(Math.PI / n)) + spacing);
        layout(state.theta);
      };
      window.addEventListener('resize', handle);
      return () => {
        window.removeEventListener('resize', handle);
        tween.kill();
      };
    },
    { scope: containerRef }
  );

  const onEnter = (idx) => {
    const inner = innerRefs.current[idx];
    if (!inner) return;
    gsap.to(inner, { rotateY: 180, duration: 0.6, ease: 'power2.out' });
    if (tweenRef.current) tweenRef.current.pause();
  };

  const onLeave = (idx) => {
    const inner = innerRefs.current[idx];
    if (!inner) return;
    gsap.to(inner, { rotateY: 0, duration: 0.6, ease: 'power2.inOut' });
    if (tweenRef.current) tweenRef.current.resume();
  };

  return (
    <section className="testimonials-ring" ref={containerRef}>
      <div className="ring-header">
        <h2 className="ring-title">{title}</h2>
        <p className="ring-sub">Always rotating. Hover a card to flip.</p>
        <p className="ring-lead">{lead}</p>
      </div>

      <div className="ring-viewport">
        <div className="ring" ref={ringRef}>
          {data.map((entry, idx) => {
            const { common, binomial, photo, desc } = entry;
            const imageUrl = photo.customSrc || `${baseImageUrl}-${photo.code}?h=900&auto=format&fit=crop&q=80`;
            const pageUrl = `https://unsplash.com/photos/${photo.page}`;
            const objectPosition = photo.pos || '50% 50%';
            return (
              <article
                className="ring-card"
                key={`${common}-${idx}`}
                ref={(el) => (cardRefs.current[idx] = el)}
              >
                <div className="face-orient" ref={(el) => (faceRefs.current[idx] = el)}>
                  <div
                    className="card-inner"
                    ref={(el) => (innerRefs.current[idx] = el)}
                    onMouseEnter={() => onEnter(idx)}
                    onMouseLeave={() => onLeave(idx)}
                  >
                  <div className="card-face card-front">
                    <div className="media" style={{ ['--pos']: objectPosition }}>
                      <img src={imageUrl} alt={photo.text} loading="lazy" />
                      <div className="overlay" />
                    </div>
                    <header className="meta">
                      <h3 className="name">{common}</h3>
                      <em className="latin">{binomial}</em>
                    </header>
                  </div>

                  <div className="card-face card-back">
                    <div className="media" style={{ ['--pos']: objectPosition }}>
                      <img src={imageUrl} alt={photo.text} loading="lazy" />
                      <div className="overlay light" />
                    </div>
                    <div className="content">
                      <p className="desc">{desc}</p>
                      <span className="credit">
                        by <a href={pageUrl} target="_blank" rel="noreferrer">{photo.by}</a>
                      </span>
                    </div>
                  </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


