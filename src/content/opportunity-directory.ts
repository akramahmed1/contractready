/**
 * Opportunities directory: curated links to official government sources.
 *
 * Verification policy: every URL below comes from an official government
 * page or document and was checked live on 2026-09-21. Agencies move
 * pages, so re-verify periodically before relying on any single link.
 */

export interface DirectoryLink {
  label: string;
  url: string;
  hint: string;
}

export interface DirectorySection {
  id: string;
  title: string;
  intro: string;
  links: DirectoryLink[];
}

export const FEDERAL_SOLICITATIONS: DirectorySection = {
  id: "federal",
  title: "Federal solicitations",
  intro:
    "Live federal contract opportunities are published on SAM.gov. Use your personalized search pack for searches matched to your profile, or start from the official sources below.",
  links: [
    {
      label: "SAM.gov Contract Opportunities",
      url: "https://sam.gov/opportunities",
      hint: "The official system of record for federal solicitations, pre-solicitations, and award notices. Free to search.",
    },
    {
      label: "USAspending Advanced Search",
      url: "https://www.usaspending.gov/search",
      hint: "Search past federal awards by agency, recipient, place of performance, and more. Use it to see who buys what you sell.",
    },
    {
      label: "GSA: Find opportunities",
      url: "https://www.gsa.gov/small-business/find-opportunities",
      hint: "GSA's official guide to finding federal opportunities, including SAM.gov, eBuy, and subcontracting paths.",
    },
  ],
};

export const SUBCONTRACTS: DirectorySection = {
  id: "subcontracts",
  title: "Subcontracts",
  intro:
    "Large prime contractors must subcontract portions of federal work to small businesses. These official sources list subcontracting opportunities.",
  links: [
    {
      label: "SBA Connect (SubNet)",
      url: "https://connect.sba.gov/Home/Login",
      hint: "The SBA's subcontracting network. Prime contractors post subcontracting and teaming opportunities here. Free account required.",
    },
    {
      label: "GSA Subcontracting Directory",
      url: "https://www.gsa.gov/small-business/register-your-business/subcontracting-and-other-partnerships",
      hint: "Large GSA prime contractors with small business subcontracting plans. Contact primes directly about teaming.",
    },
    {
      label: "USAspending subaward search",
      url: "https://www.usaspending.gov/search",
      hint: "In Advanced Search, flip the Subawards toggle to find subrecipients and the prime awards behind them.",
    },
  ],
};

export const CONTRACTOR_DIRECTORY: DirectorySection = {
  id: "contractors",
  title: "Contractor directory",
  intro:
    "Research who is already winning federal work: look up registered entities and past awards before you reach out to primes or teaming partners.",
  links: [
    {
      label: "USAspending Recipient Profiles",
      url: "https://www.usaspending.gov/recipient",
      hint: "Look up any company by name or UEI to see its federal award history and parent-child relationships.",
    },
    {
      label: "Federal Procurement Data System (FPDS)",
      url: "https://www.fpds.gov",
      hint: "The government's principal repository of federal procurement data, maintained by GSA. Source of USAspending contract data.",
    },
  ],
};

export const PROCUREMENT_FORECASTS: DirectorySection = {
  id: "forecasts",
  title: "Procurement forecasts",
  intro:
    "Agencies publish forecasts of upcoming contract opportunities. Forecasts change often; always confirm details in the final solicitation.",
  links: [],
};

export interface StatePortal {
  state: string;
  portalName: string;
  url: string;
}

export const STATE_PORTALS_INTRO =
  "Every state runs its own procurement portal for state and local contracts. These are the official portals, verified September 2026.";

export const STATE_PORTALS: StatePortal[] = [
  {
    state: "Alabama",
    portalName: "Alabama Buys",
    url: "https://alabamabuys.gov",
  },
  {
    state: "Alaska",
    portalName: "Alaska Online Public Notices",
    url: "https://aws.state.ak.us/OnlinePublicNotices/default.aspx?msg=0",
  },
  {
    state: "Arizona",
    portalName: "Arizona Procurement Portal (APP)",
    url: "https://app.az.gov/page.aspx/en/usr/login?ReturnUrl=%2fpage.aspx%2fen%2fbuy%2fhome",
  },
  {
    state: "Arkansas",
    portalName: "Arkansas Office of State Procurement - Current Solicitations",
    url: "https://www.arkansas.gov/tss/procurement/bids/index.php",
  },
  {
    state: "California",
    portalName: "Cal eProcure",
    url: "https://caleprocure.ca.gov/pages/SupplierRegistration-BS3/SupplierRegistration.aspx",
  },
  {
    state: "Colorado",
    portalName: "ColoradoVSS",
    url: "https://vss.state.co.us/home",
  },
  {
    state: "Connecticut",
    portalName: "CTsource Bid Board",
    url: "https://portal.ct.gov/DAS/CTSource/BidBoard",
  },
  {
    state: "Delaware",
    portalName: "MyMarketplace Bid Solicitation Directory",
    url: "https://mmp.delaware.gov/Bids/",
  },
  {
    state: "Florida",
    portalName: "MyFloridaMarketPlace",
    url: "https://vendor.myfloridamarketplace.com/",
  },
  {
    state: "Georgia",
    portalName: "Georgia Procurement Registry",
    url: "http://ssl.doas.state.ga.us/PRSapp/PR_index.jsp",
  },
  {
    state: "Hawaii",
    portalName: "HIePRO",
    url: "https://hiepro.ehawaii.gov/vendor.html",
  },
  {
    state: "Idaho",
    portalName: "Idaho Division of Purchasing",
    url: "https://purchasing.idaho.gov/information-for-vendors/",
  },
  {
    state: "Illinois",
    portalName: "BidBuy",
    url: "https://www.bidbuy.illinois.gov/bso/",
  },
  {
    state: "Indiana",
    portalName: "IDOA Procurement - Bidder Opportunities",
    url: "https://www.in.gov/idoa/procurement/",
  },
  {
    state: "Iowa",
    portalName: "DAS Bidding Opportunities",
    url: "https://bidopportunities.iowa.gov/",
  },
  {
    state: "Kansas",
    portalName: "Kansas eSupplier",
    url: "https://supplier.sok.ks.gov/psc/sokfsprdsup/SUPPLIER/ERP/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL?&",
  },
  {
    state: "Kentucky",
    portalName: "eMARS Vendor Self Service (VSS)",
    url: "https://finance.ky.gov/eProcurement/Pages/state-agency-and-local-government-procurement.aspx",
  },
  {
    state: "Louisiana",
    portalName: "LaGov Vendor",
    url: "https://lagoverpvendor.doa.louisiana.gov/irj/portal/anonymous?guest_user=self_reg",
  },
  {
    state: "Maine",
    portalName: "Maine Vendor Self-Service (VSS)",
    url: "https://www.maine.gov/dafs/bbm/procurementservices/vendors",
  },
  {
    state: "Maryland",
    portalName: "eMMA (eMaryland Marketplace Advantage)",
    url: "https://emma.maryland.gov/page.aspx/en/usr/login?ReturnUrl=%2fpage.aspx%2fen%2fbuy%2fhomepage",
  },
  {
    state: "Massachusetts",
    portalName: "COMMBUYS",
    url: "https://www.commbuys.com",
  },
  {
    state: "Michigan",
    portalName: "SIGMA Vendor Self-Service (SIGMA VSS)",
    url: "https://www.michigan.gov/dtmb/procurement/contractconnect/how-to-register",
  },
  {
    state: "Minnesota",
    portalName: "Minnesota Supplier Portal (SWIFT)",
    url: "https://mn.gov/admin/osp/vendors/solicitations-and-contract-opportunities/supplier-portal/index.jsp",
  },
  {
    state: "Mississippi",
    portalName: "Mississippi eProcurement (MAGIC) - Supplier / Sell",
    url: "https://www.ms.gov/dfa/contract_bid_search/Home/Sell",
  },
  {
    state: "Missouri",
    portalName: "MissouriBUYS",
    url: "https://missouribuys.mo.gov/registration",
  },
  {
    state: "Montana",
    portalName: "Montana Vendor Portal",
    url: "https://spb.mt.gov/Vendor-Resources/Vendor-Registration-Portal",
  },
  {
    state: "Nebraska",
    portalName: "Nebraska DAS Materiel - Bid Opportunities",
    url: "https://das.nebraska.gov/materiel/bid-opportunities.html",
  },
  {
    state: "Nevada",
    portalName: "NEVADAePro",
    url: "https://nevadaepro.com/bso/",
  },
  {
    state: "New Hampshire",
    portalName: "Statewide Bids and Proposals (NH DAS Procurement and Support Services)",
    url: "https://apps.das.nh.gov/bidscontracts/bids.aspx",
  },
  {
    state: "New Jersey",
    portalName: "NJSTART",
    url: "https://www.njstart.gov/bso/",
  },
  {
    state: "New Mexico",
    portalName: "NM-SPD Procurement Portal (Euna/Bonfire)",
    url: "https://generalservicesstatenmus.bonfirehub.com/",
  },
  {
    state: "New York",
    portalName: "NYS Contract Reporter",
    url: "https://www.nyscr.ny.gov/",
  },
  {
    state: "North Carolina",
    portalName: "NC eProcurement",
    url: "https://eprocurement.nc.gov/",
  },
  {
    state: "North Dakota",
    portalName: "NDBuys",
    url: "https://www.omb.nd.gov/doing-business-state/procurement/ndbuys",
  },
  {
    state: "Ohio",
    portalName: "OhioBuys",
    url: "https://ohiobuys.ohio.gov",
  },
  {
    state: "Oklahoma",
    portalName: "Oklahoma Supplier Portal",
    url: "http://vendors.ok.gov/",
  },
  {
    state: "Oregon",
    portalName: "OregonBuys",
    url: "https://oregonbuys.gov/bso/",
  },
  {
    state: "Pennsylvania",
    portalName: "PA eMarketplace",
    url: "https://www.emarketplace.state.pa.us/",
  },
  {
    state: "Rhode Island",
    portalName: "Ocean State Procures (OSP)",
    url: "https://ridop.ri.gov/ocean-state-procures-osp",
  },
  {
    state: "South Carolina",
    portalName: "SC Office of State Procurement",
    url: "https://www.procurement.sc.gov/",
  },
  {
    state: "South Dakota",
    portalName: "South Dakota Office of Procurement Management",
    url: "https://boa.sd.gov/centralservices/procurementmanagement/default.aspx",
  },
  {
    state: "Tennessee",
    portalName: "Tennessee Central Procurement Office (Edison Supplier Portal)",
    url: "https://www.tn.gov/generalservices/procurement.html",
  },
  {
    state: "Texas",
    portalName: "Texas Comptroller CMBL Vendor Registration",
    url: "https://comptroller.texas.gov/purchasing/vendor/registration/",
  },
  {
    state: "Utah",
    portalName: "Utah Division of Purchasing",
    url: "https://purchasing.utah.gov/for-vendors/",
  },
  {
    state: "Vermont",
    portalName: "VTBuys",
    url: "https://vtbuys.suppliers.vermont.gov/",
  },
  {
    state: "Virginia",
    portalName: "eVA",
    url: "https://eva.virginia.gov/register-now.html",
  },
  {
    state: "Washington",
    portalName: "Washington Electronic Business Solution (WEBS)",
    url: "https://des.wa.gov/do-business-state",
  },
  {
    state: "West Virginia",
    portalName: "West Virginia Purchasing Bulletin (wvOASIS Vendor Self-Service)",
    url: "https://www.state.wv.us/admin/purchase/bidinfo.html",
  },
  {
    state: "Wisconsin",
    portalName: "Wisconsin VendorNet",
    url: "https://vendornet.wi.gov/",
  },
  {
    state: "Wyoming",
    portalName: "Public Purchase (State of Wyoming)",
    url: "http://www.publicpurchase.com/gems/wyominggsd,wy/buyer/public/publicInfo",
  },
];

export const DIRECTORY_SECTIONS: DirectorySection[] = [
  FEDERAL_SOLICITATIONS,
  SUBCONTRACTS,
  CONTRACTOR_DIRECTORY,
  PROCUREMENT_FORECASTS,
];
