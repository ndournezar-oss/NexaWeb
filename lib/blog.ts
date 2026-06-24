/**
 * Données du blog — contenu structuré en TypeScript (pas de MDX/Markdown :
 * zéro dépendance ajoutée, articles statiques via generateStaticParams,
 * texte 100% réel et crawlable). Le temps de lecture est calculé, pas
 * deviné, à partir du nombre de mots réel de chaque article.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

type BlogPostInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keyword: string;
  excerpt: string;
  content: ContentBlock[];
  relatedSlugs: string[];
};

export type BlogPost = BlogPostInput & { readingTime: string };

function wordCount(content: ContentBlock[]): number {
  return content.reduce((total, block) => {
    if (block.type === "ul") return total + block.items.join(" ").split(/\s+/).length;
    return total + block.text.split(/\s+/).length;
  }, 0);
}

function readingTimeFor(content: ContentBlock[]): string {
  const minutes = Math.max(1, Math.round(wordCount(content) / 200));
  return `${minutes} min de lecture`;
}

const RAW_POSTS: BlogPostInput[] = [
  {
    slug: "pourquoi-pme-marocaine-site-web-2026",
    title: "Pourquoi votre PME marocaine a besoin d'un site web en 2026",
    description:
      "92% des Marocains sont en ligne, mais moins d'une entreprise sur cinq a un vrai site web. Découvrez pourquoi ce retard coûte des clients chaque jour — et comment le rattraper.",
    date: "2026-05-15",
    keyword: "site web PME Maroc",
    excerpt:
      "92% des Marocains sont en ligne, mais moins d'une entreprise sur cinq a un vrai site. Voici ce que ça change pour votre business.",
    relatedSlugs: ["prix-site-web-maroc-2026", "chatbot-ia-entreprise-maroc"],
    content: [
      {
        type: "p",
        text: "Si votre entreprise marocaine n'a pas encore de site web professionnel, vous n'êtes pas seul — vous êtes même dans la majorité. Mais cette majorité est en train de perdre du terrain, chaque jour, face à une réalité simple : vos clients sont déjà en ligne, et ils vous y cherchent.",
      },
      { type: "h2", text: "Le Maroc est massivement connecté" },
      {
        type: "p",
        text: "92% des Marocains utilisent internet au quotidien (source : Digital 2025). Ce n'est plus un public de niche urbain et connecté — c'est la norme, dans toutes les régions et toutes les générations. Smartphone en poche, vos clients potentiels passent des heures chaque jour en ligne : réseaux sociaux, recherche Google, comparaison de prix, avis clients. Si votre entreprise n'existe pas dans cet espace, elle est tout simplement invisible pour une écrasante majorité de votre marché.",
      },
      { type: "h2", text: "78% des consommateurs recherchent en ligne avant d'acheter" },
      {
        type: "p",
        text: "Ce chiffre est sans doute le plus parlant pour un dirigeant de PME : 78% des consommateurs marocains recherchent une entreprise ou un produit en ligne avant de passer à l'achat, même quand l'achat final se fait en magasin (source : Digital 2025). Concrètement, un client qui veut faire réparer sa voiture, réserver un traiteur ou trouver un architecte va d'abord taper une recherche sur son téléphone. S'il ne trouve rien — ou pire, une page abandonnée depuis deux ans — il passe au résultat suivant. Votre concurrent.",
      },
      { type: "h2", text: "Le terrain est encore (presque) vide" },
      {
        type: "p",
        text: "Voici la bonne nouvelle dans tout ça : moins d'une entreprise marocaine sur cinq dispose aujourd'hui d'un véritable site web professionnel (source : ANRT). Ce n'est pas une fatalité, c'est une fenêtre. Contrairement à des marchés saturés où chaque secteur déborde de concurrents déjà bien installés en ligne, une grande partie du marché marocain est encore à prendre. Le premier acteur sérieux et visible dans son secteur et sa ville prend une avance qui devient difficile à rattraper.",
      },
      { type: "h2", text: "Vous avez 0,05 seconde pour convaincre" },
      {
        type: "p",
        text: "75% des consommateurs jugent la crédibilité d'une entreprise sur la base de son site web (source : Stanford). Et la première impression se forme en une fraction de seconde — quelques dixièmes de seconde suffisent à un visiteur pour décider, inconsciemment, s'il vous fait confiance ou s'il referme l'onglet. Un site lent, daté ou mal pensé sur mobile envoie un signal, même si votre service ou vos produits sont excellents : celui d'une entreprise qui n'a pas investi dans son image. À l'inverse, un site soigné rassure avant même d'avoir lu un mot.",
      },
      { type: "h2", text: "À quoi ça ressemble, concrètement" },
      {
        type: "p",
        text: "Prenons un exemple simple : un cabinet d'architecture à Casablanca qui n'existe que via un compte de réseau social. Un prospect sérieux — disons une entreprise qui veut rénover ses bureaux — voudra voir un book de réalisations, comprendre les services proposés, et pouvoir prendre contact facilement. Sans site, ce prospect doute, hésite, et finit souvent par contacter un concurrent mieux structuré en apparence, même si le travail réel est équivalent. Le même raisonnement s'applique à un restaurant, un cabinet médical, une agence de location ou une entreprise de BTP : le site web n'est plus un luxe d'image, c'est le premier point de contact réel avec vos futurs clients.",
      },
      { type: "h2", text: "Un site premium n'est plus réservé aux grandes entreprises" },
      {
        type: "p",
        text: "Pendant longtemps, avoir un site web vraiment soigné était perçu comme un investissement réservé aux grands groupes, avec des budgets et des délais qui décourageaient les PME. Cette époque est révolue. Des agences jeunes et spécialisées — c'est notre cas chez NaxioWeb — proposent aujourd'hui la qualité de finition des grandes structures, sans leur lourdeur ni leur facture, avec des délais de quelques semaines plutôt que plusieurs mois. Le vrai frein aujourd'hui n'est plus le budget : c'est le retard pris à se lancer pendant que d'autres avancent.",
      },
      { type: "h2", text: "Ce qu'un bon site change concrètement" },
      {
        type: "ul",
        items: [
          "Il travaille pour vous 24h/24, même le week-end et les jours fériés.",
          "Il rassure un prospect avant le premier appel ou la première visite.",
          "Il peut qualifier vos demandes automatiquement grâce à un assistant IA intégré.",
          "Il vous rend trouvable sur Google, sur les recherches qui comptent pour votre activité.",
        ],
      },
      { type: "h2", text: "Conclusion : le bon moment, c'est maintenant" },
      {
        type: "p",
        text: "Le Maroc digital n'est plus une promesse, c'est une réalité installée. La question n'est plus de savoir si vos clients sont en ligne — ils y sont déjà, à 92%. La vraie question est de savoir si vous y êtes aussi, et si ce que vous leur montrez donne envie de vous faire confiance. Chez NaxioWeb, on conçoit des sites premium, pensés pour convertir, avec la possibilité d'y intégrer un assistant IA qui qualifie vos prospects pendant que vous travaillez.",
      },
    ],
  },
  {
    slug: "prix-site-web-maroc-2026",
    title: "Combien coûte un site web au Maroc en 2026 ?",
    description:
      "Vitrine ou e-commerce, sur-mesure ou template, avec ou sans IA : voici, sans chiffres inventés, tout ce qui fait varier le prix d'un site web au Maroc.",
    date: "2026-05-29",
    keyword: "prix site web Maroc",
    excerpt:
      "Il n'existe pas un prix unique pour 'un site web'. Voici ce qui fait vraiment varier le budget — sans chiffres inventés.",
    relatedSlugs: ["pourquoi-pme-marocaine-site-web-2026", "site-vitrine-ou-ecommerce-maroc"],
    content: [
      {
        type: "p",
        text: "C'est la question qu'on nous pose le plus souvent, et c'est normal : avant de se lancer, on veut savoir à quoi s'attendre. La vraie réponse honnête est qu'il n'existe pas un prix unique pour « un site web » — tout dépend de ce que vous faites construire. Voici, sans chiffres inventés ni promesses, ce qui fait varier le prix d'un site au Maroc, et comment réfléchir à votre budget.",
      },
      { type: "h2", text: "Ce qui fait varier le prix d'un site web" },
      { type: "h3", text: "Vitrine ou e-commerce" },
      {
        type: "p",
        text: "Un site vitrine — qui présente votre activité, vos services, vos contacts — demande beaucoup moins de travail technique qu'une boutique en ligne avec gestion de stock, paiement en ligne, comptes clients et logistique. L'e-commerce implique plus de pages, plus de logique technique, et plus de tests avant la mise en ligne. Ça se reflète naturellement dans le prix.",
      },
      { type: "h3", text: "Sur-mesure ou template" },
      {
        type: "p",
        text: "Un site construit à partir d'un template générique, simplement personnalisé aux couleurs de votre marque, coûte structurellement moins cher qu'un site conçu entièrement sur-mesure, pensé pour votre positionnement et votre audience spécifique. Les deux approches ont leur place selon le budget et l'ambition — mais elles ne se comparent pas au même prix, ni au même résultat en termes de différenciation.",
      },
      { type: "h3", text: "Avec ou sans assistant IA intégré" },
      {
        type: "p",
        text: "Intégrer un assistant IA fonctionnel — qui qualifie vos prospects et répond 24/7 — demande un travail technique supplémentaire par rapport à un simple formulaire de contact. C'est un investissement qui se rentabilise vite en temps gagné et en prospects mieux qualifiés, mais il a un coût de développement propre.",
      },
      { type: "h3", text: "SEO et maintenance" },
      {
        type: "p",
        text: "Un site bien structuré pour le référencement dès sa conception, et accompagné dans la durée (mises à jour, hébergement, petites évolutions), représente un travail continu qui peut être inclus dès le départ ou facturé séparément selon les agences. Vérifiez toujours ce qui est compris dans le prix annoncé : un site « pas cher » qui ne référence jamais sur Google ne vous rapporte rien.",
      },
      { type: "h2", text: "Des repères généraux, sans chiffres inventés" },
      {
        type: "p",
        text: "Honnêtement : nous ne prétendrons pas vous donner des fourchettes précises pour « le marché marocain », parce que les écarts sont énormes — d'un freelance débutant à une agence internationale, le même mot « site web » peut désigner des réalités totalement différentes, avec des prix qui varient dans des proportions très larges. Ce qui compte vraiment, ce n'est pas le prix affiché, mais ce qu'il y a derrière : design réellement sur-mesure ou template recyclé, code propre et rapide ou usine à gaz, accompagnement réel ou livraison sans suivi.",
      },
      { type: "h2", text: "Ce qui fait la vraie valeur d'un site" },
      {
        type: "ul",
        items: [
          "Un design qui vous ressemble vraiment, pas un gabarit déjà vu cent fois.",
          "Une vitesse de chargement qui ne fait pas fuir vos visiteurs.",
          "Une structure pensée pour être trouvée sur Google, pas juste « jolie ».",
          "Un accompagnement humain, pas un ticket de support anonyme.",
        ],
      },
      { type: "h2", text: "Penser en investissement, pas en dépense" },
      {
        type: "p",
        text: "Un site web n'est pas une dépense ponctuelle à minimiser, c'est un actif qui travaille pour vous dans la durée — un commercial qui ne dort jamais, qui peut qualifier vos prospects via un assistant IA, et qui continue à rapporter des mois, voire des années après sa mise en ligne. Comparé au coût d'acquisition d'un seul client mal qualifié par d'autres canaux, un site bien construit se rentabilise généralement très vite. La bonne question n'est donc pas « combien ça coûte », mais « combien ça me rapporte si c'est bien fait ».",
      },
      { type: "h2", text: "Notre approche chez NaxioWeb : la transparence" },
      {
        type: "p",
        text: "Chez NaxioWeb, on ne donne pas de prix en ligne pour une raison simple : on refuse de vous vendre un forfait générique qui ne correspond pas à votre projet réel. À la place, on propose un premier échange gratuit et sans engagement, pendant lequel on comprend vos besoins, votre secteur et vos objectifs, avant de vous proposer un devis clair et sur-mesure. Notre positionnement : la qualité de finition d'une grande agence, portée par une structure jeune et légère — donc sans la facture qui va avec une grosse structure.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Le bon réflexe n'est pas de chercher « le prix d'un site web au Maroc » comme s'il existait un tarif universel, mais de clarifier d'abord ce dont votre activité a réellement besoin. Une fois ce besoin clair, le budget devient une conversation simple et transparente.",
      },
    ],
  },
  {
    slug: "chatbot-ia-entreprise-maroc",
    title: "Chatbot IA pour entreprise : à quoi ça sert (et comment ça change tout)",
    description:
      "Qualification de prospects, support 24/7, exemples par secteur : voici concrètement ce qu'un assistant IA bien intégré change pour une entreprise marocaine.",
    date: "2026-06-05",
    keyword: "chatbot IA entreprise Maroc",
    excerpt:
      "Un assistant IA bien intégré n'est pas un gadget — c'est un collaborateur numérique qui qualifie vos prospects 24/7. Voici comment, concrètement.",
    relatedSlugs: ["pourquoi-pme-marocaine-site-web-2026", "refonte-site-web-signes"],
    content: [
      {
        type: "p",
        text: "Le mot « chatbot » fait parfois penser à un gadget — une fenêtre de discussion qui répond à côté de la question, frustrante pour l'utilisateur. Un assistant IA bien intégré, c'est l'inverse : un véritable collaborateur numérique qui travaille pour votre entreprise 24 heures sur 24. Voici concrètement ce que ça change.",
      },
      { type: "h2", text: "Qualification des prospects, automatiquement" },
      {
        type: "p",
        text: "La première mission d'un assistant IA intégré à votre site, c'est de poser les bonnes questions à votre place. Plutôt que de recevoir des dizaines de messages génériques, l'assistant pose les questions qui comptent — budget, besoin précis, échéance — et ne fait remonter vers vous que les demandes réellement qualifiées. Vous gagnez du temps, et vous arrêtez de courir après des prospects qui ne sont pas prêts.",
      },
      { type: "h2", text: "Support 24/7, sans embaucher la nuit" },
      {
        type: "p",
        text: "Vos visiteurs ne naviguent pas seulement aux heures de bureau. Le soir, le week-end, pendant les jours fériés : un assistant IA continue de répondre, de rassurer, et de récolter les demandes pendant que votre équipe est indisponible. Ce n'est pas une question de remplacer l'humain — c'est une question de ne plus perdre de prospects simplement parce qu'ils sont arrivés sur votre site au mauvais moment.",
      },
      { type: "h2", text: "Des cas concrets, secteur par secteur" },
      { type: "h3", text: "Immobilier et location" },
      {
        type: "p",
        text: "Une agence de location qui reçoit chaque jour des dizaines d'appels de qualification répétitifs peut laisser un assistant IA filtrer ces demandes — budget, dates, type de bien — et ne basculer vers un humain que les dossiers réellement sérieux.",
      },
      { type: "h3", text: "Restauration" },
      {
        type: "p",
        text: "Un restaurant peut utiliser son assistant pour répondre aux questions fréquentes (horaires, menu, réservations, allergènes) sans monopoliser le personnel en salle, particulièrement aux heures de rush.",
      },
      { type: "h3", text: "Services aux entreprises" },
      {
        type: "p",
        text: "Un cabinet de conseil, une agence ou un prestataire B2B peut qualifier ses demandes entrantes — secteur, taille d'entreprise, besoin — avant même le premier appel commercial, pour arriver en rendez-vous déjà préparé.",
      },
      { type: "h2", text: "Ce que ça fait gagner, concrètement" },
      {
        type: "ul",
        items: [
          "Du temps : moins de questions répétitives à traiter manuellement.",
          "De la qualité : seuls les prospects sérieux remontent jusqu'à vous.",
          "De la disponibilité : une présence active même hors horaires de bureau.",
          "De la première impression : un site qui répond instantanément inspire confiance.",
        ],
      },
      { type: "h2", text: "Un filtre, pas un remplacement" },
      {
        type: "p",
        text: "Il est important d'être honnête sur ce qu'un assistant IA fait et ne fait pas : il ne remplace pas votre expertise ni la relation humaine qui scelle une vente. Son rôle est de filtrer et préparer le terrain, pour que le temps de votre équipe soit entièrement consacré aux conversations qui comptent vraiment — celles avec des prospects déjà qualifiés et prêts à avancer.",
      },
      { type: "h2", text: "Pourquoi si peu d'agences le proposent au Maroc" },
      {
        type: "p",
        text: "Intégrer un assistant IA qui fonctionne réellement — et pas un widget générique mal configuré — demande une compétence technique spécifique, à la croisée du développement web et de l'intelligence artificielle. C'est précisément le créneau de NaxioWeb : une équipe qui a grandi avec ces outils, pour qui l'IA n'est pas une option ajoutée après coup, mais une compétence centrale au même titre que le design.",
      },
      { type: "h2", text: "Testez-le vous-même" },
      {
        type: "p",
        text: "Le meilleur moyen de comprendre ce qu'un assistant IA peut faire pour votre entreprise, c'est de lui parler directement. Sur notre page Assistants IA, vous pouvez tester en direct le même type d'assistant qu'on intègre à nos clients — posez-lui une question sur votre secteur, et voyez par vous-même comment il qualifie la conversation.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Un assistant IA n'est pas un gadget futuriste réservé aux grandes entreprises technologiques. C'est un outil concret, accessible dès aujourd'hui, qui transforme un site web statique en véritable collaborateur disponible en permanence.",
      },
    ],
  },
  {
    slug: "refonte-site-web-signes",
    title: "Refonte de site web : 7 signes qu'il est temps",
    description:
      "Site lent, non responsive, design daté, zéro conversion : voici 7 signes concrets qui indiquent qu'une refonte de votre site web n'est plus une option.",
    date: "2026-06-12",
    keyword: "refonte site web",
    excerpt:
      "Site lent, daté, qui ne convertit pas : voici 7 signes concrets qu'il est temps de refondre votre site web.",
    relatedSlugs: ["chatbot-ia-entreprise-maroc", "prix-site-web-maroc-2026"],
    content: [
      {
        type: "p",
        text: "Un site web n'est jamais « terminé » — ce qui était moderne il y a cinq ans peut aujourd'hui faire fuir vos visiteurs sans même que vous vous en rendiez compte. Voici sept signes concrets qui indiquent qu'une refonte n'est plus une option, mais une priorité.",
      },
      { type: "h2", text: "Pourquoi on attend (trop) longtemps avant d'agir" },
      {
        type: "p",
        text: "La plupart des dirigeants savent, au fond, que leur site mériterait une refonte — mais le quotidien prend le dessus, et « on verra plus tard » devient une habitude. Le problème, c'est que pendant ce temps, vos concurrents les plus actifs continuent d'avancer, pendant que votre site continue de perdre silencieusement des clients, sans qu'aucune alerte ne vous prévienne. Le seul vrai coût, c'est celui qu'on ne voit jamais : les visiteurs qui repartent sans laisser de trace.",
      },
      { type: "h2", text: "1. Votre site est lent" },
      {
        type: "p",
        text: "Quelques secondes de chargement en trop suffisent à faire fuir une grande partie de vos visiteurs avant même qu'ils n'aient vu votre contenu. Plus de la moitié des visiteurs mobiles abandonnent un site qui met plus de 3 secondes à s'afficher. Chaque seconde compte directement contre votre taux de conversion.",
      },
      { type: "h2", text: "2. Il n'est pas pensé pour mobile" },
      {
        type: "p",
        text: "La majorité du trafic web au Maroc, comme ailleurs, passe par smartphone. Un site qui s'affiche mal, qui demande de zoomer ou dont les boutons sont trop petits pour un pouce envoie un message clair : cette entreprise n'a pas investi dans son expérience client la plus courante.",
      },
      { type: "h2", text: "3. Il ne convertit pas" },
      {
        type: "p",
        text: "Du trafic qui n'aboutit jamais à un contact, un appel ou une vente est le symptôme le plus direct d'un site qui ne fait pas son travail. Souvent, le problème n'est pas le manque de visiteurs, mais un parcours confus, des appels à l'action absents ou mal placés, ou une absence totale de raison de passer à l'action.",
      },
      { type: "h2", text: "4. Le design est daté" },
      {
        type: "p",
        text: "Polices d'un autre temps, couleurs criardes, mise en page surchargée : un design daté n'est pas qu'une question d'esthétique. 75% des consommateurs jugent la crédibilité d'une entreprise sur son design (source : Stanford) — un site qui a visiblement plusieurs années de retard visuel projette, consciemment ou non, l'image d'une entreprise qui a pris du retard tout court.",
      },
      { type: "h2", text: "5. Pas de certificat HTTPS" },
      {
        type: "p",
        text: "Si votre site affiche encore un avertissement « non sécurisé » dans la barre d'adresse, c'est un signal d'alarme immédiat pour vos visiteurs — et un frein direct à votre référencement, Google pénalisant les sites non sécurisés dans ses résultats.",
      },
      { type: "h2", text: "6. Une mauvaise expérience qui ne pardonne pas" },
      {
        type: "p",
        text: "88% des visiteurs ne reviennent jamais sur un site après une mauvaise expérience. Ce chiffre devrait suffire à lui seul à convaincre : chaque visiteur déçu par la lenteur, la confusion ou le design de votre site n'est pas simplement perdu pour cette visite — il est perdu durablement, et il s'en va probablement vers un concurrent.",
      },
      { type: "h2", text: "7. Vous ne pouvez plus rien y changer vous-même" },
      {
        type: "p",
        text: "Un site construit sur une technologie obsolète ou par un prestataire injoignable devient un poids : chaque petite mise à jour — un nouveau service, une photo, un changement d'horaires — devient un parcours du combattant. Un bon site doit pouvoir évoluer avec votre entreprise, pas la freiner.",
      },
      { type: "h2", text: "Et maintenant ?" },
      {
        type: "p",
        text: "Si vous avez reconnu votre site dans au moins deux ou trois de ces signes, la refonte n'est plus une question de « si » mais de « quand ». La bonne nouvelle, c'est qu'une refonte bien menée ne signifie pas tout reconstruire dans la douleur : c'est l'occasion de repartir sur des bases saines — rapides, sécurisées, pensées mobile, et si vous le souhaitez, avec un assistant IA intégré dès la conception.",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Un site daté coûte plus cher qu'une refonte : il coûte les clients que vous ne voyez jamais, ceux qui sont passés par votre site avant d'aller voir ailleurs. Chez NaxioWeb, on transforme des sites datés en vitrines premium pensées pour convertir.",
      },
    ],
  },
  {
    slug: "site-vitrine-ou-ecommerce-maroc",
    title: "Site vitrine ou e-commerce : lequel choisir pour votre business au Maroc ?",
    description:
      "Vitrine ou boutique en ligne ? Découvrez comment choisir la bonne formule pour votre activité, avec le contexte réel du marché e-commerce marocain.",
    date: "2026-06-19",
    keyword: "site vitrine e-commerce Maroc",
    excerpt:
      "Vitrine ou boutique en ligne : le bon choix dépend de votre modèle économique, pas d'une mode. Voici comment trancher.",
    relatedSlugs: ["prix-site-web-maroc-2026", "pourquoi-pme-marocaine-site-web-2026"],
    content: [
      {
        type: "p",
        text: "C'est souvent la première grande décision à prendre avant même de penser au design : votre entreprise a-t-elle besoin d'un site vitrine ou d'une boutique en ligne complète ? Les deux répondent à des objectifs différents, et le bon choix dépend entièrement de la façon dont vous vendez.",
      },
      { type: "h2", text: "Le site vitrine : présenter et convaincre" },
      {
        type: "p",
        text: "Un site vitrine présente votre activité, vos services, vos réalisations et vos coordonnées, dans le but de convaincre un visiteur de vous contacter — par téléphone, WhatsApp, formulaire ou visite en magasin. C'est la solution adaptée à une grande partie des entreprises marocaines : artisans, professions libérales, agences de services, restaurants, cabinets, PME B2B. L'achat final ne se fait pas forcément en ligne, mais la décision, elle, se construit largement en ligne.",
      },
      { type: "h2", text: "L'e-commerce : vendre directement en ligne" },
      {
        type: "p",
        text: "Un site e-commerce va plus loin : il permet au client de choisir un produit, de l'ajouter au panier, de payer en ligne et de se faire livrer, sans intervention humaine dans le processus de vente. C'est la solution adaptée si votre activité repose sur la vente de produits physiques (ou numériques) standardisés, que vous pouvez décrire, montrer en photo et expédier.",
      },
      { type: "h2", text: "Le marché de l'e-commerce marocain ne cesse de grandir" },
      {
        type: "p",
        text: "Le marché de l'e-commerce au Maroc a dépassé les 20 milliards de dirhams en 2025 (source : ANRT), porté par une adoption croissante du paiement en ligne et une confiance grandissante des consommateurs envers les achats digitaux. Pour les entreprises qui vendent des produits, c'est un signal clair : l'infrastructure et les habitudes d'achat sont là pour soutenir une boutique en ligne sérieuse.",
      },
      { type: "h2", text: "Comment choisir, concrètement" },
      {
        type: "ul",
        items: [
          "Vous vendez un service ou une expertise (conseil, artisanat sur-mesure, BTP, santé) → site vitrine, pensé pour la prise de contact qualifiée.",
          "Vous vendez des produits standardisés en quantité (mode, cosmétique, accessoires, alimentaire) → e-commerce, pensé pour la transaction directe.",
          "Vous vendez un mélange des deux (produits + prestations sur-mesure) → un site vitrine solide avec un module e-commerce ciblé, plutôt qu'une boutique complète surdimensionnée.",
          "Vous démarrez et testez votre marché → commencez par un site vitrine plus léger, et envisagez l'e-commerce une fois la demande confirmée.",
        ],
      },
      { type: "h2", text: "La confiance, le vrai enjeu de l'e-commerce" },
      {
        type: "p",
        text: "Vendre en ligne au Maroc implique un enjeu supplémentaire : rassurer un client qui paie avant de voir et toucher le produit. Paiement sécurisé clairement affiché, photos de qualité, politique de retour transparente et avis clients visibles ne sont pas des détails — ce sont les éléments qui transforment un visiteur hésitant en acheteur confiant. Un site e-commerce mal exécuté sur ces points perd des ventes même avec un excellent produit.",
      },
      { type: "h2", text: "Un assistant IA change la donne dans les deux cas" },
      {
        type: "p",
        text: "Que vous optiez pour un site vitrine ou une boutique en ligne, un assistant IA intégré apporte la même valeur : répondre aux questions fréquentes, qualifier les demandes, et rassurer le visiteur au moment précis où il hésite. Sur un site vitrine, il qualifie les prospects avant le premier contact humain. Sur un e-commerce, il peut répondre aux questions sur un produit, les délais de livraison ou les modalités de retour.",
      },
      { type: "h2", text: "Notre recommandation" },
      {
        type: "p",
        text: "Il n'y a pas de réponse universelle, seulement la bonne réponse pour votre activité précise. La meilleure approche reste d'en parler directement : on analyse avec vous votre modèle économique, votre cible et vos objectifs, pour vous recommander honnêtement la solution la plus adaptée — y compris si la réponse est « commencez plus simple que prévu ».",
      },
      { type: "h2", text: "Conclusion" },
      {
        type: "p",
        text: "Vitrine ou e-commerce, le bon choix n'est jamais une question de mode mais de modèle économique. Ce qui ne change pas, en revanche, c'est l'exigence : un design premium, une expérience rapide et soignée, et — si votre activité s'y prête — un assistant IA pour ne plus jamais perdre un prospect par manque de réponse.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = RAW_POSTS.map((post) => ({
  ...post,
  readingTime: readingTimeFor(post.content),
})).sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, limit);
}
