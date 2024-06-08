export const BrandName = "demo"; // demo

const CfgMap = {
  demo: {
    dbClusterId: "ibi2llw781",
    Workflow: {
      enabled: false,
    },
    MultiStore: {
      enabled: false,
    },
    Deposit: {
      enabled: false,
    },
    Product: {
      enabled: true,
    },
    Inventory: {
      enabled: true,
    },
    Appointment: {
      enabled: false,
    },
    Feedback: {
      enabled: true,
    },
    CategoryList:{
      enabled: false
    }
  },
  shutterlux: {
    dbClusterId: "12pqq5anfh",
    Workflow: {
      enabled: true,
    },
    MultiStore: {
      enabled: true,
    },
    Deposit: {
      enabled: true,
    },
    Product: {
      enabled: false,
    },
    Inventory: {
      enabled: false,
    },
    Appointment: {
      enabled: true,
    },
    Feedback: {
      enabled: false,
    },
    CategoryList:{
      enabled: false
    }
  },
};
export const env = "prd";
export const Cfg = CfgMap[BrandName.toLowerCase()];