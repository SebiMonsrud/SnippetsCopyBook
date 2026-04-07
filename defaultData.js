module.exports = {
  // 📁 KATEGORIER
  categories: [
    { id: '1', name: 'Service' },
    { id: '2', name: 'Aksjoner' },
    { id: '3', name: 'Diverse' }
  ],

  // 📝 PARAGRAFER / SNIPPETS
  // Husk å koble 'categoryId' til riktig 'id' fra kategoriene over.
  snippets: [
    { id: '1', categoryId: '1', title: 'Bremsevæske service', text: '- Utført standardomfang\n- Skiftet bremsevæske\n- Panserdempere OK' },
    { id: '2', categoryId: '1', title: 'Liten service', text: '- Utført standardomfang\n- Skiftet motorolje og filter\n- Skiftet mikrofilter\n- Skiftet batteri i fjernkontroll' },
    { id: '3', categoryId: '1', title: 'Bremsevæske service m/kjøretøy-kontroll', text: '- Utført standardomfang\n- Skiftet bremsevæske\n- Utført kjøretøy-kontroll\n- Skiftet mikrofilter\n- Skiftet batteri i fjernkontroll' },
    { id: '4', categoryId: '1', title: 'Stor service diesel', text: '- Utført standardomfang\n- Skiftet motorolje og filter\n- Skiftet mikrofilter\n- Skiftet luftfilter\n- Skiftet drivstoffilter og luftet drivstoff system\n- Utført kjøretøy-kontroll\n- Skiftet batteri i fjernkontroll' },
    { id: '5', categoryId: '1', title: 'Stor service bensin/PHEV', text: '- Utført standardomfang\n- Skiftet tennplugger\n- Skiftet motorolje og filter\n- Skiftet mikrofilter\n- Skiftet luftfilter\n- Utført kjøretøy-kontroll\n- Skiftet batteri i fjernkontroll' },
    { id: '6', categoryId: '2', title: 'Aksjon Tannstang i20 / IX', text: '- Utført Aksjon _________ skifte tannstang\n- Demontert hjul og underplater\n- Utført skift av tannstang\n- Montert hjul og underplater\n- Etterstrammet hjul\n- Avlest feilminne\n- Slettet feilminne OK\n- Utført programmering av bil til I-Level: _________\n- Utført 4hjulskontroll\n- Utført EPS-startup\n- Prøvekjørt OK\n- Rattet er rett' },
    { id: '7', categoryId: '2', title: 'Skift kjølevæske ventiler (EV)', text: '- Utført _________ Skift av kjølevæske ventiler\n- Har skrudd av og sjekket at Høyspent er deaktivert\n- Satt kjølesystemet i workshop-mode\n- Tappet kjølevæske at bil\n- Utført skift av kjølevæske ventil\n- Utført vakumfylling (5 Liter kjølevæske) og lufting av kjølevæskesystem\n- Har skrudd på og sjekket at høyspent er aktivert\n- Slettet feilminne OK' },
    { id: '8', categoryId: '2', title: 'Tverrstilt motor EGR kjøler', text: '- Utført aksjon _________ Skift av EGR kjøler\n- Tappet gammel kjølevæske\n- Demontert gammelt luft filter\n- Demontert tverrstag og batterikasse, DDE og underplate for batterikasse\n- Demontert EGR kjøler\n- Demontert gamle kjøleslanger foran mellom motor og radiator\n- Tatt bilde av ny kode til kjøler\n- Utført rens av blandingsrør\n- Montert nye kjøleslanger foran mellom motor og radiator\n- Montert inn ny EGR kjøler\n- Montert tverrstag og batterikasse, DDE og underplate for batterikasse\n- Montert nytt luftfilter med gammel luftmassemåler\n- Vakumfylt og luftet kjølesystem. Fylt 5 liter kjølevæske\n- Utført Testmoduler for EGR kjøler aksjon. Trykktest og sletting av adapsjoner\n- Registrert ny kjøler\n- prøvekjørt OK' },
    { id: '9', categoryId: '2', title: 'Rettstilt motor EGR kjøler', text: '- Utført aksjon _________ Skift av EGR kjøler\n- Tappet gammel kjølevæske\n- Demontert luft filter og luftrør ned til turbo\n- Demontert gammel lyddempningsplate\n- Demontert EGR kjøler\n- Tatt bilde av ny kode til kjøler\n- Utført rens av blandingsrør\n- Montert inn ny EGR kjøler\n- montert ny lyddempningsplate\n- Montert luftfilter og luftrør ned til turbo\n- Vakumfylt og luftet kjølesystem. Fylt 5 liter kjølevæske\n- Utført Testmoduler for EGR kjøler aksjon sletting av adapsjoner og trykktest\n- Registrert ny kjøler\n- prøvekjørt OK' },
    { id: '10', categoryId: '2', title: 'X5 passasjer airbag', text: '- Utført Aksjon _________ Replacing the front passenger airbag\n- Demontert og skyvd tilbake midtkonsoll\n- Demontert deksler, headunit og skjerm samt ratt og deksel rundt ratt\n- Demontert A stolpe deksler \n- Løftet opp dashbord\n- Utført skift av airbag OK\n- Montert dashbord\n- Montert deksler, headunit og skjerm\n- Montert A stolpe deksler\n- Montert underplater under dashbord\n- Skyvd fram midtkonsoll og Montert sideplater\n- Lært inn ratt vinkel sensor\n- Slettet feilminne OK\n- Serie.nr: _________' },
    { id: '11', categoryId: '2', title: 'Auxiliary heater / Høyspent varmer', text: '- Utført kortest og avlest feilminne\n- Auxilary heater er locked in driving cycle. JA feil\n- gått igjennom testmodul for denne og får diakode på skift av varmer\n- Blir bedt om å skru av og på bil og om feil fortsatt er der så skal varmer skiftes.\n- Får Diakode på skift av varmer\n- Har skrudd av høyspentsystem og sjekket at det er deaktivert\n- Tappet kjølevæske av bil og utført skift av varmer\n- Vakum fylt og luftet kjølevæske system 5 liter OK\n- Har skrudd på høyspent system og sjekket at det er aktivt\n- Funkjsonstestet system og sjekket om isulasjonsmotstands feil er tilsstedet. det er det ikke\n- Prøvekjørt OK' },
    { id: '12', categoryId: '3', title: 'Klargjøring', text: '- Utført teknisk klargjøring\n- Hjul lagt i bil\n- Låsebolter lagt i rom under i bagasjerom\n- Skilterrammer skrudd på\n- Refleksvest lagt inn i bil\n- Servicebok lagt i hanskerom' },
    { id: '13', categoryId: '3', title: 'Klargjøring (Med Hjulskift)', text: '- Utført teknisk klargjøring\n- Utført Hjulskift\n- Hjul lagt i bil\n- Låsebolter lagt i rom under i bagasjerom\n- Skilterrammer skrudd på\n- Refleksvest lagt inn i bil\n- Servicebok lagt i hanskerom' }
  ],

  // 🛠️ CHECKLISTE / BUILDER ITEMS
  builderItems: [
    { id: 'b-1', text: "- Utført standardomfang" },
    { id: 'b-2', text: "- Utført motorolje service" },
    { id: 'b-3', text: "- Utført bremsevæske service" },
    { id: 'b-4', text: "- Utført kjøretøy-kontroll" },
    { id: 'b-5', text: "- Utført skift av tennplugger" },
    { id: 'b-6', text: "- Utført drivstofffilter service" },
    { id: 'b-7', text: "- Utført skift av luftfilter" },
    { id: 'b-8', text: "- Utført skift av mikrofilter" },
    { id: 'b-9', text: "- Kontrollert dekktrykk OK" },
    { id: 'b-10', text: "- Kontrollert kjølevæske OK" },
    { id: 'b-11', text: "- Fylt på spylevæske" },
    { id: 'b-12', text: "- Skiftet Skiver og klosser foran" },
    { id: 'b-13', text: "- Skiftet Skiver og klosser bak" }
  ],

  // ⚙️ INNSTILLINGER
  settings: {
    theme: 'dark',
    templates: []
  }
};
