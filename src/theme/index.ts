import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  className: "chakra-button",
  base: {
    fontFamily: "body",
    borderRadius: "sm",
    borderWidth: "1px",
    borderColor: "borderDefault",
    bg: "white",
    color: "textSecondary",
    _hover: { bg: "surface" },
  },
  variants: {
    variant: {
      ghost: {
        borderWidth: "0px",
        bg: "transparent",
        _hover: { bg: "surface" },
      },
      solid: {
        bg: "textPrimary",
        color: "white",
        borderWidth: "0px",
        _hover: { opacity: 0.9 },
      },
    },
    size: {
      sm: { h: "32px", px: "12px", fontSize: "sm", fontWeight: "600" },
      md: { h: "40px", px: "16px", fontSize: "md", fontWeight: "600" },
    },
  },
  defaultVariants: { variant: "ghost", size: "sm" },
});

const badgeRecipe = defineRecipe({
  className: "chakra-badge",
  base: {
    fontFamily: "body",
    fontWeight: "700",
    borderRadius: "pill",
    px: "10px",
    py: "3px",
    fontSize: "sm",
  },
  variants: {
    variant: {
      live: { bg: "liveChip", color: "white" },
      days: {
        bg: "schedGreenBg",
        color: "greenDot",
        borderWidth: "1px",
        borderColor: "schedGreenBorder",
      },
    },
  },
});

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-manrope)" },
        body: { value: "var(--font-manrope)" },
      },

      radii: {
        xs: { value: "6px" },
        sm: { value: "8px" },
        md: { value: "12px" },
        pill: { value: "999px" },
      },

      colors: {
        white: { value: "#FFFFFF" },
        page: { value: "#FFFFFF" },
        surface: { value: "#FAFBFC" },
        surfaceSoft: { value: "#EEF2F6" },
        surfaceSoftHover: { value: "#E7EEF6" },

        textPrimary: { value: "#1A1A2E" },
        textSecondary: { value: "#3C4858" },
        textMuted: { value: "#8492A6" },

        borderDefault: { value: "#D9E5F2" },
        borderSoft: { value: "#F0F4F8" },

        sidebarText: { value: "#4E5D69" },
        sidebarAccent: { value: "#4F46E5" },
        sidebarActiveBg: { value: "#F0F0FF" },

        staffLink: { value: "#3D7EFF" },

        cardHoverShadow: { value: "#00000014" },

        liveBg: { value: "#FFF5F5" },
        liveBorder: { value: "#FF6669" },
        liveChip: { value: "#FF4D4F" },

        modeChipLive: { value: "#FF383C" },
        modeChipPlanner: { value: "#5653FC" },

        greenDot: { value: "#10B981" },

        schedOrangeBg: { value: "#FDF5F0" },
        schedOrangeBorder: { value: "#E35F00" },
        schedOrangeTag: { value: "#E35F00" },

        schedGreenBg: { value: "#F1FBF4" },
        schedGreenBorder: { value: "#19C34C" },
        schedGreenTag: { value: "#19C34C" },

        schedYellowBg: { value: "#F9F9F1" },
        schedYellowBorder: { value: "#A19712" },
        schedYellowTag: { value: "#A19712" },

        daysBadgeBg: { value: "#E6F9F0" },
        daysBadgeBorder: { value: "#B2EDCE" },
      },

      fontSizes: {
        xs: { value: "11px" },
        sm: { value: "12px" },
        md: { value: "14px" },
        lg: { value: "16px" },
        xl: { value: "24px" },
      },
    },

    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
    },
  },
});
