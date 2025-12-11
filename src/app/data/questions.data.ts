import { Question } from '../models/question.model';

export const QUESTIONS: Question[] = [
  // NIVELL 1: ELS FONAMENTS (Qüestions 1-3)
  {
    id: 1,
    level: 1,
    title: 'DELICTES INFORMÀTICS BÀSICS',
    situation: 'Una empleada de la comptabilitat d\'una empresa accedeix a emails privats del seu cap sense permís per espiar si li van a pujar el sou.',
    question: 'Segons el Codi Penal Espanyol, quin tipus de delicte ha comès aquesta empleada?',
    options: [
      { text: 'No és delicte, només una infracció administrativa', isCorrect: false },
      { text: 'Delicte contra la intimitat / accés il·lícit a sistemes informàtics', isCorrect: true },
      { text: 'Estafa electrònica', isCorrect: false },
      { text: 'Blanqueig de capitals', isCorrect: false }
    ],
    hint: 'Penseu en si accedir a la informació privada d\'algú sense permís pot ser un delicte. Recordeu que els delictes informàtics són una categoria específica del Codi Penal.',
    explanation: 'Els delictes contra la intimitat i l\'accés no autoritzat a sistemes informàtics són recollits al Codi Penal com a delictes informàtics greus.'
  },
  {
    id: 2,
    level: 1,
    title: 'RESPONSABILITAT PENAL DE LES ORGANITZACIONS',
    situation: 'La direcció d\'una empresa de telecomunicacions descobreix que dos dels seus enginyers han comès frau electrònic de forma privada. La direcció no els ha ordenat fer-ho, ni hi ha hagut incitament. Però no tenien sistemes de control per evitar-ho.',
    question: 'Serà l\'empresa responsable penalment pel delicte dels enginyers?',
    options: [
      { text: 'No, perquè la direcció no va ordenar el delicte', isCorrect: false },
      { text: 'Sí, sempre i incondicional', isCorrect: false },
      { text: 'Pot ser, si no demostra que ha implementat un sistema de gestió de compliance penal efectiu', isCorrect: true },
      { text: 'Només si els enginyers confessen', isCorrect: false }
    ],
    hint: 'La clau és "sistema de gestió de compliance penal". Recordeu que aquest sistema pot evitar que l\'empresa sigui responsable legalment. Consulta els apunts sobre UNE 19601.',
    explanation: 'Segons la reforma del Codi Penal espanyol (Llei Orgànica 1/2015, article 31b), les persones jurídiques poden ser responsables penalment pels delictes comesos pels seus empleats TRET que demostrin que tenien implementat un sistema de gestió de compliance penal efectiu.'
  },
  {
    id: 3,
    level: 1,
    title: 'ELS ELEMENTS CLAU D\'UN SISTEMA DE COMPLIANCE',
    situation: 'Una empresa ha implementat un sistema de gestió de compliance penal. Vull saber quins són els 3 elements més essencials que ha de tenir obligatòriament.',
    question: 'Què de les opcions següents és MENYS important en un SGCP segons la norma UNE 19601?',
    options: [
      { text: 'Un codi ètic i lideratge demostrat per la direcció', isCorrect: false },
      { text: 'Un canal de denúncies anònim per reportar activitats sospitoses', isCorrect: false },
      { text: 'El color del logo de l\'empresa en tota la senyalètica', isCorrect: true },
      { text: 'Processos de formació i conscienciació dels empleats', isCorrect: false }
    ],
    hint: 'Llegeix els requisits del SGCP a la norma UNE 19601. Quins són els elements que realment prevenen delictes? La cosmètica de l\'empresa no prevé delictes penals...',
    explanation: 'Els elements reals d\'un SGCP són: lideratge, codi ètic, canal de denúncies, formació, controls financers i no financers, auditories... El color del logo NO té res a veure amb compliance penal!'
  },

  // NIVELL 2: CASOS COMPLEXOS (Qüestions 4-6)
  {
    id: 4,
    level: 2,
    title: 'DELICTES CONTRA DADES PERSONALS (RGPD)',
    situation: 'Una empresa de recursos humans utilitza dades personals de candidats de forma inadequada. Compra una base de dades de currículums il·legals d\'una web obscura per contactar amb treballadors.',
    question: 'Quines normatives ESPECÍFIQUES ha violat aquesta empresa?',
    options: [
      { text: 'Només la Llei de Propietat Intel·lectual (LPI)', isCorrect: false },
      { text: 'RGPD, LOPDGD i possiblement Codi Penal (delicte contra la intimitat)', isCorrect: true },
      { text: 'Només la LSSI-CE (Llei de Comerç Electrònic)', isCorrect: false },
      { text: 'Cap, perquè no van ser ells els que robaren les dades', isCorrect: false }
    ],
    hint: 'Penseu: quina normativa reguladora de dades personals heu estudiat? RGPD és Europeu, LOPDGD és l\'adaptació espanyola.',
    explanation: 'El RGPD i la LOPDGD regulen dades personals. Si les dades eren robades, pot haver-hi un delicte penal contra la intimitat.'
  },
  {
    id: 5,
    level: 2,
    title: 'SISTEMA DE DENÚNCIES I GESTIÓ D\'INCIDENTS',
    situation: 'Un empleat de la IT descobreix frau electrònic però té por de represàlies. L\'empresa no té canal de denúncies formal.',
    question: 'Quins riscos penals corre AQUESTA EMPRESA per no tenir un canal de denúncies?',
    options: [
      { text: 'Tots els mencionats: responsable del frau, represàlies, incompliment de SGCP', isCorrect: true },
      { text: 'Cap, perquè el frau va ser comès per una persona individual', isCorrect: false },
      { text: 'Només per represàlies si es demostra que les va fer', isCorrect: false },
      { text: 'L\'empresa no té responsabilitat en casos de frau intern', isCorrect: false }
    ],
    hint: 'Reviseu la norma UNE 19601 sobre els elements obligatoris d\'un SGCP. El canal de denúncies no és opcional, és OBLIGATORI.',
    explanation: 'Un canal de denúncies és OBLIGATORI en un SGCP efectiu.'
  },
  {
    id: 6,
    level: 2,
    title: 'SUBORN I CORRUPCIÓ (ISO 37001)',
    situation: 'Un gestor de compres rep una tablet d\'alt cost d\'un proveïdor per assegurar contractes. L\'empresa no té política antisuborn.',
    question: 'Quin tipus de delicte és aquest i qui podria ser responsable?',
    options: [
      { text: 'Cap delicte, és normal en els negocis', isCorrect: false },
      { text: 'Suborn. Tant el proveïdor, com el gestor, i possiblement l\'empresa', isCorrect: true },
      { text: 'Estafa, només del proveïdor', isCorrect: false },
      { text: 'Frau fiscal, dels dos', isCorrect: false }
    ],
    hint: 'El suborn implica oferir algo a canvi d\'una acció incorrecta. Recordeu que la ISO 37001 és la norma que prevé precisament això.',
    explanation: 'El suborn és un delicte greu. La ISO 37001 és el sistema antisuborn.'
  },

  // NIVELL 3: DILEMES REALS (Qüestions 7-9)
  {
    id: 7,
    level: 3,
    title: 'CONTRACTACIÓ DE PERSONAL I DEGUDA DILIGÈNCIA',
    situation: 'Una empresa contracta sense investigar antecedents. Mesos després, es descobreix que l\'empleat estava sancionat per corrupció.',
    question: 'Quines fallades de compliance penal ha comès aquesta empresa?',
    options: [
      { text: 'Cap, la culpa és del empleat per no ser honest', isCorrect: false },
      { text: 'No té un procés de deguda diligència documentat', isCorrect: true },
      { text: 'Només pot ser culpada si tenia informació prèvia', isCorrect: false },
      { text: 'La responsabilitat és 100% del empleat', isCorrect: false }
    ],
    hint: 'Penseu en les mesures de control mencionades a la norma UNE 19601. La deguda diligència en personal és una de les més importants.',
    explanation: 'La deguda diligència en la contractació és essencial.'
  },
  {
    id: 8,
    level: 3,
    title: 'RESPOSTA DAVANT D\'UN INCIDENT',
    situation: 'Filtració de dades de 50.000 clients. El director decideix no notificar-ho.',
    question: 'Quins delictes o infraccions podria cometre l\'empresa NO notificant la filtració?',
    options: [
      { text: 'Cap, si ningú no ho sap no hi ha problema', isCorrect: false },
      { text: 'Violació del RGPD (infracció molt greu) i possiblement delicte penal', isCorrect: true },
      { text: 'Només infracció si ho sap l\'AEPD', isCorrect: false },
      { text: 'Seria delicte, però només per al director', isCorrect: false }
    ],
    hint: 'El RGPD és molt clar sobre la notificació obligatòria de 72 hores.',
    explanation: 'El RGPD OBLIGA a notificar a l\'AEPD dins de 72 hores.'
  },
  {
    id: 9,
    level: 3,
    title: 'ÀREA DE GRÍS - DECISIÓ ÈTICA I LEGAL',
    situation: 'Empresa de logística que subcontracta transportistes que violen normatives. L\'empresa fa "la vista grossa".',
    question: 'Pot l\'empresa ser responsable penalment?',
    options: [
      { text: 'No, perquè els transportistes són independents', isCorrect: false },
      { text: 'Potencialment sí, si no té deguda diligència amb tercers', isCorrect: true },
      { text: 'Només si l\'empresa els ordena explícitament', isCorrect: false },
      { text: 'La responsabilitat és 100% dels transportistes', isCorrect: false }
    ],
    hint: 'Reviseu els controls de deguda diligència a tercers en la norma UNE 19601.',
    explanation: 'La deguda diligència amb tercers és un element clau del SGCP.'
  }
];

export const FINAL_CHALLENGE_CASE = {
  title: 'TechStart Solutions - Auditoria Flash',
  description: `
    <h3>Context de l'Empresa</h3>
    <p><strong>TechStart Solutions</strong> és una startup tecnològica de 50 empleats que desenvolupa aplicacions mòbils per al sector financer. Va ser fundada fa 3 anys i ha crescut ràpidament.</p>
    
    <h3>Situacions Detectades</h3>
    <ul>
      <li><strong>Situació 1:</strong> No hi ha cap política de seguretat de la informació documentada. Els desenvolupadors utilitzen els seus propis ordinadors personals per accedir a dades de clients bancaris.</li>
      <li><strong>Situació 2:</strong> Un empleat va denunciar irregularitats en el tractament de dades personals, però va ser acomiadat dos dies després. No hi ha canal de denúncies formal.</li>
      <li><strong>Situació 3:</strong> El director comercial ofereix regals valuosos (viatges, rellotges de luxe) a directius de bancs per assegurar contractes. Això no està documentat ni controlat.</li>
      <li><strong>Situació 4:</strong> Les dades personals dels usuaris de les aplicacions es venien a tercers sense consentiment explícit per generar ingressos addicionals.</li>
      <li><strong>Situació 5:</strong> No hi ha cap formació en matèria de compliance, protecció de dades o ètica empresarial per als empleats.</li>
      <li><strong>Situació 6:</strong> L'empresa va patir una filtració de dades fa 6 mesos que va afectar 100.000 usuaris, però mai es va notificar a l'AEPD ni als afectats.</li>
    </ul>
    
    <h3>La Vostra Tasca</h3>
    <p>Com a consultors de compliance penal, heu de realitzar una auditoria flash i proporcionar recomanacions immediates.</p>
  `
};
