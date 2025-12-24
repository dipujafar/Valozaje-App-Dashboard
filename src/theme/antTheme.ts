const antTheme = {
  token: {
    colorPrimary: "#28A745",
    colorInfo: "#28A745",
  },
  components: {
    Layout: {
      bodyBg: "rgb(255,255,255)",
    },
    Menu: {
      itemSelectedColor: "var(--color-menu-item)",
      itemSelectedBg: "var(--color-main)",
    },
    Table: {
      headerBg: "#E9E9E9",
      headerColor: "#000000",
      colorBgContainer: "var(--color-section-bg)",
      headerSplitColor: "#E9E9E9",
      colorText: "#000000",
      borderColor: "var(--color-section-bg)",
      rowHoverBg: "var(--color-main-bg)",
    },
    Modal: {
      colorIcon: "rgba(255,255,255,0.45)",
      contentBg: "var(--color-section-bg)",
      colorText: "var(--color-text-color)",
    },

    Button: {
      defaultBg: "var(--color-main)",
      defaultColor: "rgba(255,255,255,0.88)",
    },
    Popconfirm: {
      colorWarning: "rgb(205,3,53)",
    },
    Form: {
      labelFontSize: 18,
    },
    Tabs: {
      itemSelectedColor: "#467BAB",
    },
  },
};

export default antTheme;
