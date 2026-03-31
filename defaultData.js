module.exports = {
  // 📁 KATEGORIER
  categories: [
    { id: '1', name: 'Service' },
    { id: '2', name: 'Aksjoner' }
  ],

  // 📝 PARAGRAFER / SNIPPETS
  // Husk å koble 'categoryId' til riktig 'id' fra kategoriene over.
  snippets: [
    { id: '1', categoryId: '1', title: 'Stor olje service', text: '- Utført standardomfang\n- Utført motorolje service\n- Utført kjøretøy-kontroll\n- Utført skift av tennplugger\n- Utført drivstofffilter service\n- Utført skift av luftfilter\n- Utført skift av mikrofilter' },
    { id: '2', categoryId: '1', title: 'Liten olje service', text: '- Utført standardomfang\n- Utført motorolje service\n- Utført kjøretøy-kontroll\n- Utført skift av mikrofilter' },
    { id: '3', categoryId: '1', title: 'Stor bremsevæske service', text: '- Utført standardomfang\n- Utført bremsevæske service\n- Utført kjøretøy-kontroll- Utført skift av mikrofilter' },
    { id: '4', categoryId: '1', title: 'Liten bremsevæske service', text: '- Utført standardomfang\n- Utført bremsevæske service' }
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
