/* ════════════════════════════════════════════════════════════════
   CLIENTS — the logo wall on clients.html and each client's container.

   Add a client: copy one block. Add work: drop an item into `reels`
   or `designs`.
     { ig: 'CODE' }   Instagram — the code in instagram.com/reel/CODE/ or /p/CODE/
     { tt: 'ID' }     TikTok — the number in tiktok.com/@user/video/ID
     { fb: 'URL' }    Facebook video — its full facebook.com/.../videos/... address

   logo     : file in assets/images/clients/ — logos/<id>.png is the client's logo
              in white on transparent (full-colour copies in logos/color/).
   logoType : 'mark'   = a transparent logo, shown large on its plate
   Logo files (all transparent PNG):
     logos/on-dark/<id>.png  colour logo, dark ink lifted so it reads on the dark tile (used here)
     logos/color/<id>.png    colour logo exactly as designed (for light backgrounds)
     logos/<id>.png          all-white version
   plate    : optional colour behind a logo; leave it out for the dark tile.
              'avatar' = a square picture (e.g. a profile photo)
   No logo  : the tile sets the client's name as a wordmark until a logo arrives.
   ════════════════════════════════════════════════════════════════ */

window.CLIENTS = [
  {
    id: 'azzam', en: 'Dr. Azzam Clinics', ar: 'مجمع د. عزام',
    sectorEn: 'Medical complex', sectorAr: 'مجمع طبي',
    handle: 'allam_medic', logo: 'logos/on-dark/azzam.png?v=2', logoType: 'mark',
    reels: [{ tt: '7695881094310251796' }, { tt: '7666855997079686421' }, { tt: '7661303891710987540' }, { tt: '7657590827681664277' }],
    designs: [{ tt: '7696166566102125844' }, { ig: 'DYhZ-uZI3HG' }],
  },
  {
    id: 'chmc', en: 'Community Health Medical Complex', ar: 'مجمع عيادات صحة المجتمع الطبي',
    sectorEn: 'Medical complex', sectorAr: 'مجمع طبي',
    cityEn: 'Yanbu', cityAr: 'ينبع',
    handle: 'chmc_sa', logo: 'logos/on-dark/chmc.png?v=2', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DfNfuFrJD_k' }, { ig: 'DfFjCPIR7qe' }],
  },
  {
    id: 'phaedra', en: 'Phaedra Clinics', ar: 'عيادات فيدرا',
    sectorEn: 'Aesthetic & dental clinic', sectorAr: 'عيادات تجميل وأسنان',
    cityEn: 'Yanbu', cityAr: 'ينبع',
    handle: 'phaedraclinic', logo: 'logos/on-dark/phaedra.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DexAskMomfy' }, { ig: 'Ddjm5pBNuZf' }, { ig: 'DaTOC1pIWHI' }],
    designs: [],
  },
  {
    id: 'alogaly', en: 'Al-Ogaly Medical Clinics', ar: 'عيادات العقالي الطبية',
    sectorEn: 'Medical clinics', sectorAr: 'عيادات طبية',
    cityEn: 'Madinah', cityAr: 'المدينة المنورة',
    handle: 'alogalyomc', logo: 'logos/on-dark/alogaly.png?v=2', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DexDzr4kZG1' }],
  },
  {
    id: 'refit', en: 'Refit Gym', ar: 'نادي إعادة اللياقة',
    sectorEn: "Women's gym", sectorAr: 'نادي رياضي نسائي',
    handle: 'refit_az', logo: 'logos/on-dark/refit.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DbqeY4for_n' }, { ig: 'DcydnmVIsyZ' }, { ig: 'DblQZ8WIwKg' }],
    designs: [],
  },
  {
    id: 'be-active', en: 'Be Active', ar: 'بي أكتيف',
    sectorEn: 'Fitness', sectorAr: 'لياقة بدنية',
    handle: 'be.active.ksa', logo: 'logos/on-dark/be-active.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DcbbdR7CKMq' }],
    designs: [],
  },
  {
    id: 'nab3-alfurat', en: 'Nab3 Al-Furat', ar: 'نبع الفرات',
    sectorEn: 'Ceramics & marble', sectorAr: 'سيراميك ورخام',
    cityEn: 'Madinah', cityAr: 'المدينة المنورة',
    handle: 'nab3_alfurat', logo: 'logos/on-dark/nab3-alfurat.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DdojW4OomXu' }, { ig: 'DdmUBZoo6HN' }],
    designs: [{ ig: 'De6_rH1Iz_L' }, { ig: 'Dew2QpgIoZb' }],
  },
  {
    id: 'dr-loay', en: 'Dr. Loay', ar: 'د. لؤي',
    sectorEn: 'Orthodontics', sectorAr: 'تقويم الأسنان',
    handle: 'dr.loaye_orthodontist', logo: '', logoType: '',
    reels: [{ ig: 'DdofpstAocs' }, { ig: 'Dehhe9Jx9KS' }, { ig: 'DfDMgCHRyjC' }],
    designs: [{ ig: 'DbtHc5JIP-b' }, { ig: 'Db_Pmj6gtZV' }, { ig: 'Dd1bR4jo6sK' }],
  },
  {
    id: 'al-asala', en: 'Al-Asala Egyptian Restaurants', ar: 'مطاعم الأصالة المصرية',
    sectorEn: 'Restaurants', sectorAr: 'مطاعم',
    handle: '', logo: '', logoType: '',
    reels: [{ ig: 'DWrtD_fjNzg' }, { ig: 'DYDC47LD7Lq' }],
    designs: [{ ig: 'DYr0pwFjRi_' }, { ig: 'DZP0awDjelX' }],
  },
  {
    id: 'one-rehab', en: 'One Rehabilitation Center', ar: 'مركز ون للتأهيل الحركي',
    sectorEn: 'Physiotherapy', sectorAr: 'علاج طبيعي',
    handle: 'oner7.0', logo: 'logos/on-dark/one-rehab.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DeZXqUJIOjn' }, { ig: 'DdWtb4bIeGY' }],
    designs: [],
  },
  {
    id: 'cleo', en: 'Cléo Clinics', ar: 'كليو كلينكس',
    sectorEn: 'Aesthetic clinics', sectorAr: 'عيادات تجميل',
    cityEn: 'Mansoura · Damietta', cityAr: 'المنصورة · دمياط',
    handle: 'cleoclinicsofficial', logo: 'logos/on-dark/cleo.png?v=2', logoType: 'mark',
    reels: [{ ig: 'Db_mXYMlD88' }, { ig: 'DboejpGj4kr' }, { ig: 'Das712hglGL' }],
    designs: [{ ig: 'DeKPuEmGG2y' }],
  },
  {
    id: 'se-polyclinics', en: 'SE Polyclinics', ar: 'إس إي بولي كلينيك',
    sectorEn: 'Polyclinic', sectorAr: 'مجمع عيادات',
    handle: 'se_polyclinics', logo: 'logos/on-dark/se-polyclinics.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DeCi59QBtZ3' }, { ig: 'Ddt8nIkI4jL' }, { ig: 'DYkqlMDt-Aj' }, { ig: 'DZIIBwNjsRT' }],
    designs: [],
  },
  {
    id: 'starzenia', en: 'Starzenia', ar: 'ستارزينيا',
    sectorEn: 'Skincare', sectorAr: 'عناية بالبشرة',
    handle: 'starzenia.eg', logo: 'logos/on-dark/starzenia.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DeC0Epzje9B' }],
    designs: [{ ig: 'DaqDX8qDZfE' }],
  },
  {
    id: 'dr-reham', en: 'Dr. Reham Mohammed', ar: 'د. ريهام محمد',
    sectorEn: 'Clinical nutrition', sectorAr: 'التغذية العلاجية',
    handle: 'dr_rehamnutrition', logo: '', logoType: '',
    reels: [{ ig: 'DeHb3ktilju' }, { ig: 'DZDBan4kV-6' }, { ig: 'DZU-wYxksgO' }],
    designs: [{ ig: 'DePPcbvl3Em' }, { ig: 'Da3F8MojZLp' }, { ig: 'DblZ7RQiV7L' }],
  },
  {
    id: 'dr-esraa', en: 'Dr. Esraa El-esh', ar: 'د. إسراء العش',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.esraa_elesh', logo: 'logos/dr-esraa.png', logoType: 'mark',
    reels: [{ ig: 'DdPNevlty6L' }, { ig: 'DdCN3VaNpDe' }],
    designs: [{ ig: 'DdRkCnkt7S6' }],
  },
  {
    id: 'dr-hadiel', en: 'Dr. Hadiel ElBanhawy', ar: 'د. هديل البنهاوي',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.hadiel.elbanhawy', logo: 'logos/dr-hadiel.png', logoType: 'mark',
    reels: [{ ig: 'Db8VHBTD0qw' }, { ig: 'DcWAPglDB0B' }, { ig: 'DdZP7MwjaJ4' }, { ig: 'DOGPzjHDcH0' }],
    designs: [],
  },
  {
    id: 'dr-reem', en: 'Dr. Reem Elkady', ar: 'د. ريم القاضي',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    cityEn: 'Mansoura', cityAr: 'المنصورة',
    handle: 'dr.reemelkadyy', logo: 'logos/dr-reem.png', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DZDOJFpNgvM' }, { ig: 'DaqDeBVN-BW' }, { ig: 'Db8Ltk2NZX_' }],
  },
  {
    id: 'dr-nada', en: 'Dr. Nada Salama', ar: 'د. ندى سلامة',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.nada_salamaa', logo: 'logos/dr-nada.png', logoType: 'mark',
    reels: [{ ig: 'DbtQ31XMg9V' }, { ig: 'DbgBBpwMYAy' }, { ig: 'DYP-eCnsBJ1' }, { ig: 'DUyWs-1jFdp' }],
    designs: [],
  },
  {
    id: 'dr-sharaf', en: 'Dr. Mohammed Sharaf', ar: 'د. محمد شرف',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.mohammedsharaf', logo: 'logos/dr-sharaf.png', logoType: 'mark',
    reels: [{ ig: 'DZA7hgID_VY' }, { ig: 'DXFOIjVEXGf' }],
    designs: [{ ig: 'DdL88SICsBE' }],
  },
  {
    id: 'dr-donia', en: 'Dr. Donia El-Bialy', ar: 'د. دنيا البيلي',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr_donia_elbialy', logo: '', logoType: '',
    reels: [{ ig: 'DdzDwRXOXVg' }],
    designs: [{ ig: 'DezHFJcOvxO' }],
  },
  {
    id: 'dr-eslam', en: 'Dr. Eslam Elemam', ar: 'د. إسلام الإمام',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.eslamelemam', logo: 'logos/dr-eslam.png', logoType: 'mark',
    reels: [{ ig: 'Ddj8MaBjkFq' }],
    designs: [{ ig: 'Dd9GhMJiF43' }],
  },
  {
    id: 'dr-mayada', en: 'Dr. Mayada Talaat', ar: 'د. ميادة طلعت',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr_mayada_talaat', logo: 'logos/dr-mayada.png', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DaS1S-hIJ1H' }, { ig: 'DbOSu2UofuD' }],
  },
  {
    id: 'dr-ahmad-atef', en: 'Dr. Ahmad Atef El-Beily', ar: 'د. أحمد عاطف البيلي',
    sectorEn: 'Oncoplastic surgery', sectorAr: 'جراحة الأورام والتجميل',
    handle: 'dr_ahmad_atef_onco_plastic', logo: '', logoType: '',
    reels: [],
    designs: [{ ig: 'DZaHTK1DZwv' }, { ig: 'DboImBrM8nT' }],
  },
  {
    id: 'luluat', en: 'Luluat Al-Amarah', ar: 'لؤلؤة العمارة',
    sectorEn: 'Ceramics & marble', sectorAr: 'سيراميك ورخام',
    cityEn: 'Madinah', cityAr: 'المدينة المنورة',
    handle: 'luluat.alamarah', logo: 'logos/on-dark/luluat.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DeCTpqWNvDs' }, { ig: 'Dd4FetOtZid' }],
    designs: [],
  },
  {
    id: 'dr-farouk', en: 'Dr. Ahmed Farouk', ar: 'د. أحمد فاروق',
    sectorEn: 'Gastrointestinal surgery', sectorAr: 'جراحة الجهاز الهضمي',
    handle: 'dr.ahmed.farouk.clinics', logo: 'logos/dr-farouk.png', logoType: 'mark',
    reels: [{ ig: 'Deeu5QbHWLE' }, { ig: 'DdmID8rDPC7' }],
    designs: [],
  },
  {
    id: 'tiny-hearts', en: 'Tiny Hearts · Dr. Sama Sabry', ar: 'تايني هارتس · د. سما صبري',
    sectorEn: 'Pediatric cardiology', sectorAr: 'استشاري قلب الأطفال',
    handle: '', facebook: 'Tiny.Hearts.S.Sabry', logo: '', logoType: '',
    reels: [
      { fb: 'https://www.facebook.com/Tiny.Hearts.S.Sabry/videos/2357403238411654/' },
      { fb: 'https://www.facebook.com/Tiny.Hearts.S.Sabry/videos/4582620871995368/' },
    ],
    designs: [],
  },
  {
    id: 'dr-hadeer', en: 'Dr. Hadeer Atif', ar: 'د. هدير عاطف',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    cityEn: 'Mansoura', cityAr: 'المنصورة',
    handle: 'dr.hadeer_atif', logo: 'logos/dr-hadeer.png', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DQ4zDZADMVI' }],
  },
  {
    id: 'dr-fatma', en: 'Dr. Fatma Hany', ar: 'د. فاطمة هاني',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    handle: 'dr.fatmahany', logo: 'logos/dr-fatma.png', logoType: 'mark',
    reels: [{ ig: 'DQ9gpJyDIFA' }],
    designs: [],
  },
  {
    id: 'dr-marwa', en: 'Dr. Marwa El Hagrasy', ar: 'د. مروة الحجرسي',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    cityEn: 'Mansoura', cityAr: 'المنصورة',
    handle: 'dr.marwa_elhagrasy', logo: '', logoType: '',
    reels: [],
    designs: [{ ig: 'DcycZZxCP_O' }],
  },
  {
    id: 'dr-walaa', en: 'Dr. Walaa Soliman Derma Clinic', ar: 'عيادة د. ولاء سليمان',
    sectorEn: 'Dermatology & laser', sectorAr: 'جلدية وتجميل وليزر',
    handle: 'dr_walaa_derma', logo: 'logos/on-dark/dr-walaa.png?v=2', logoType: 'mark',
    reels: [],
    designs: [{ ig: 'DeKP70JttE7' }],
  },
  {
    id: 'dr-asmaa', en: 'Dr. Asmaa Sabry', ar: 'د. أسماء صبري',
    sectorEn: 'Dermatology & aesthetics', sectorAr: 'جلدية وتجميل',
    cityEn: 'Kuwait', cityAr: 'الكويت',
    handle: 'dr.asmaa.sabry', logo: '', logoType: '',
    reels: [],
    designs: [{ ig: 'Dcq8l0OM7yO' }],
  },
  {
    id: 'al-thawaq', en: 'Al-Thawaq Al-Dimashqi', ar: 'الذواق الدمشقي',
    sectorEn: 'Restaurant', sectorAr: 'مطعم',
    cityEn: 'Yanbu', cityAr: 'ينبع',
    handle: 'alzawak1', logo: 'logos/on-dark/al-thawaq.png?v=2', logoType: 'mark',
    reels: [{ ig: 'DdhBWZpssAV' }],
    designs: [],
  },
];
