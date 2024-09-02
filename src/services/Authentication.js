export function getTokenIncludedConfig() {
    return {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
  }
