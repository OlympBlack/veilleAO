export interface AppelOffre {
    id: number
    titre: string
    organisme: string
    domaine: string
    description: string
    datePublication: string // ISO date
    dateLimite: string      // ISO date
    joursRestants: number
    score: number
    lien: string
    resumeIA: string
    isNew: boolean
}

// Fonction utilitaire pour simuler des jours restants
const addDays = (date: Date, days: number): string => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result.toISOString().split('T')[0] as string
}

const today = new Date()

export const mockOffres: AppelOffre[] = [
    {
        id: 1,
        titre: 'Refonte du portail web institutionnel',
        organisme: 'Ministère des Finances',
        domaine: 'Développement web et mobile',
        description: 'Le projet consiste en la refonte complète du site institutionnel, incluant une interface citoyen pour les déclarations en ligne.',
        datePublication: addDays(today, 0),
        dateLimite: addDays(today, 25),
        joursRestants: 25,
        score: 95,
        lien: 'https://marches-publics.bj/ao/1',
        resumeIA: 'Refonte d\'un portail web avec interface citoyen. Projet majeur nécessitant des compétences en UX/UI, développement front (Vue/React) et sécurité des données publiques. Forte adéquation avec notre expertise.',
        isNew: true
    },
    {
        id: 2,
        titre: 'Déploiement d\'une solution de GED',
        organisme: 'Agence Nationale d\'Identification des Personnes',
        domaine: 'GED',
        description: 'Mise en place d\'un système de gestion électronique de documents pour les archives physiques de l\'agence au niveau national.',
        datePublication: addDays(today, -2),
        dateLimite: addDays(today, 10),
        joursRestants: 10,
        score: 88,
        lien: 'https://marches-publics.bj/ao/2',
        resumeIA: 'Implémentation GED pour archives nationales. Nécessite une solution open source type Alfresco avec OCR et gestion des habilitations strictes.',
        isNew: false
    },
    {
        id: 3,
        titre: 'Audit de sécurité des infrastructures réseaux',
        organisme: 'Banque Centrale',
        domaine: 'Cybersécurité',
        description: 'Audit approfondi de la sécurité de notre infrastructure réseau et tests d\'intrusion sur nos applications exposées.',
        datePublication: addDays(today, 0),
        dateLimite: addDays(today, 5),
        joursRestants: 5,
        score: 92,
        lien: 'https://marches-publics.bj/ao/3',
        resumeIA: 'Audit de sécurité (pentest + revue architecture) pour cible bancaire. Critères de qualification élevés (certifications requises).',
        isNew: true
    },
    {
        id: 4,
        titre: 'Fourniture d\'équipements informatiques (laptops et serveurs)',
        organisme: 'Ministère de l\'Éducation',
        domaine: 'Fourniture équipements',
        description: 'Lot 1 : 500 ordinateurs portables. Lot 2 : 10 serveurs rackables.',
        datePublication: addDays(today, -5),
        dateLimite: addDays(today, 12),
        joursRestants: 12,
        score: 65,
        lien: 'https://marches-publics.bj/ao/4',
        resumeIA: 'Fourniture de matériel (500 PC, 10 Serveurs). Opportunité intéressante mais hors de notre cœur de métier (développement). Revente ou partenariat possible.',
        isNew: false
    },
    {
        id: 5,
        titre: 'Application mobile de suivi de chantiers',
        organisme: 'Société Nationale de Construction',
        domaine: 'Développement web et mobile',
        description: 'Développement d\'une application sur tablettes pour la remontée d\'informations de terrain par les chefs de chantiers (mode offline requis).',
        datePublication: addDays(today, -1),
        dateLimite: addDays(today, 18),
        joursRestants: 18,
        score: 90,
        lien: 'https://marches-publics.bj/ao/5',
        resumeIA: 'Application mobile (iOS/Android) avec forte contrainte d\'utilisation hors-ligne (synchronisation différée). Parfait pour du React Native ou Flutter.',
        isNew: true
    },
    {
        id: 6,
        titre: 'Mise en place d\'une architecture cloud hybride',
        organisme: 'Caisse Nationale de Sécurité Sociale',
        domaine: 'Réseaux et infrastructures',
        description: 'Migration d\'une partie du SI vers un cloud privé hébergé localement avec plan de continuité d\'activité.',
        datePublication: addDays(today, -10),
        dateLimite: addDays(today, 4),
        joursRestants: 4,
        score: 75,
        lien: 'https://marches-publics.bj/ao/6',
        resumeIA: 'Migration Cloud privé et mise en place d\'un PRA. Urgence signalée (4 jours restants). Doit être analysé rapidement.',
        isNew: false
    },
    {
        id: 7,
        titre: 'Assistance technique pour le développement d\'API backend',
        organisme: 'Opérateur Télécom',
        domaine: 'Développement logiciel',
        description: 'Recherche d\'experts (NodeJS/NestJS) pour renforcer l\'équipe DSI en régie sur 6 mois pour l\'intégration de services.',
        datePublication: addDays(today, -3),
        dateLimite: addDays(today, 30),
        joursRestants: 30,
        score: 98,
        lien: 'https://marches-publics.bj/ao/7',
        resumeIA: 'Demande de régie (profils NodeJS/NestJS) pour 6 mois. Forte rentabilité, correspond parfaitement aux profils disponibles.',
        isNew: false
    },
    {
        id: 8,
        titre: 'Formation avancée en DevSecOps',
        organisme: 'Agence des Systèmes d\'Information',
        domaine: 'Formation informatique',
        description: 'Formation de 20 cadres techniques aux pratiques DevSecOps (intégration de la sécurité dans le cycle CI/CD).',
        datePublication: addDays(today, -7),
        dateLimite: addDays(today, 15),
        joursRestants: 15,
        score: 72,
        lien: 'https://marches-publics.bj/ao/8',
        resumeIA: 'Mission de formation (DevSecOps - CI/CD sécurisé). Nécessite un formateur certifié.',
        isNew: false
    },
    {
        id: 9,
        titre: 'Dématérialisation des procédures douanières',
        organisme: 'Direction Générale des Douanes',
        domaine: 'Transformation digitale',
        description: 'Conception et implémentation d\'une plateforme fully digitalisée des formalités de fret.',
        datePublication: addDays(today, 0),
        dateLimite: addDays(today, 45),
        joursRestants: 45,
        score: 85,
        lien: 'https://marches-publics.bj/ao/9',
        resumeIA: 'Grand projet de refonte métier (Douanes). Nécessite un groupement d\'entreprises (consortium) pour répondre.',
        isNew: true
    },
    {
        id: 10,
        titre: 'Maintenance préventive et curative du parc réseau',
        organisme: 'Université d\'Abomey-Calavi',
        domaine: 'Maintenance informatique',
        description: 'Contrat cadre d\'un an renouvelable pour la maintenance du réseau campus (fibre optique et wifi).',
        datePublication: addDays(today, -15),
        dateLimite: addDays(today, 3),
        joursRestants: 3,
        score: 60,
        lien: 'https://marches-publics.bj/ao/10',
        resumeIA: 'TMA réseau (Fibre/Wifi). Marge faible, à évaluer.',
        isNew: false
    },
    {
        id: 11,
        titre: 'Refonte de l\'application de gestion des ressources humaines',
        organisme: 'Port Autonome',
        domaine: 'Développement logiciel',
        description: 'Développement d\'un SIRH sur-mesure pour la gestion des carrières, paie et pointage.',
        datePublication: addDays(today, -4),
        dateLimite: addDays(today, 22),
        joursRestants: 22,
        score: 82,
        lien: 'https://marches-publics.bj/ao/11',
        resumeIA: 'SIRH sur mesure. Compétences en ERP / développement backend complexe requises.',
        isNew: false
    },
    {
        id: 12,
        titre: 'Archivage physique et numérique des dossiers judiciaires',
        organisme: 'Ministère de la Justice',
        domaine: 'Archivage électronique',
        description: 'Numérisation, indexation et archivage dans un SAE de 5 millions de pages de dossiers physiques.',
        datePublication: addDays(today, -6),
        dateLimite: addDays(today, 14),
        joursRestants: 14,
        score: 79,
        lien: 'https://marches-publics.bj/ao/12',
        resumeIA: 'Projet volumineux (5M pages). Implique des scanners industriels en plus de la solution logicielle.',
        isNew: false
    },
    {
        id: 13,
        titre: 'Etude de schéma directeur du système d\'information',
        organisme: 'Hôpital National de Référence',
        domaine: 'Conseil et assistance technique',
        description: 'Elaboration du SDSI 2024-2028 incluant l\'interopérabilité des outils biomédicaux.',
        datePublication: addDays(today, -2),
        dateLimite: addDays(today, 28),
        joursRestants: 28,
        score: 89,
        lien: 'https://marches-publics.bj/ao/13',
        resumeIA: 'Mission de conseil pur (Schéma directeur). Demande une forte expertise en architecture d\'entreprise et SI hospitalier.',
        isNew: false
    },
    {
        id: 14,
        titre: 'Plateforme E-learning nationale',
        organisme: 'Enseignement Supérieur',
        domaine: 'Développement web et mobile',
        description: 'Déploiement et personnalisation d\'une plateforme type Moodle pour toutes les universités publiques.',
        datePublication: addDays(today, -1),
        dateLimite: addDays(today, 20),
        joursRestants: 20,
        score: 93,
        lien: 'https://marches-publics.bj/ao/14',
        resumeIA: 'Intégration Moodle à grande échelle (100k+ étudiants). Bonne maîtrise de PHP/Moodle et orchestration Cloud requise.',
        isNew: false
    },
    {
        id: 15,
        titre: 'Solution de vidéoconférence sécurisée sur site',
        organisme: 'Présidence de la République',
        domaine: 'Télécommunications',
        description: 'Fourniture et installation d\'une solution de visioconférence On-Premise hautement sécurisée.',
        datePublication: addDays(today, -8),
        dateLimite: addDays(today, 6),
        joursRestants: 6,
        score: 68,
        lien: 'https://marches-publics.bj/ao/15',
        resumeIA: 'Matériel et logiciel On-Premise pour visioconférence. Vente de solution.',
        isNew: false
    }
]
