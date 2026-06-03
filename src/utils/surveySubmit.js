const normalizeUrl = (value) => String(value || "").trim();

export const getSurveySubmitEndpoints = () => {
  const candidates = [
    normalizeUrl(import.meta.env?.VITE_KHAO_SAT_SUBMIT_URL),
    normalizeUrl(import.meta.env?.VITE_KHAO_SAT_API_URL),
    "https://survey-api.hto.edu.vn/api/khao-sat/submit",
  ];

  return [...new Set(candidates.filter(Boolean))];
};

export const submitSurveyPayload = async (payload) => {
  let lastError = null;

  for (const endpoint of getSurveySubmitEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const looksLikeJson =
        contentType.includes("application/json") ||
        responseText.trim().startsWith("{") ||
        responseText.trim().startsWith("[");

      let result = {};
      try {
        result = looksLikeJson && responseText ? JSON.parse(responseText) : { message: responseText };
      } catch {
        result = { message: responseText || "Backend returned invalid JSON" };
      }

      if (response.ok) {
        return { response, responseText, result, endpoint };
      }

      const shouldTryNext =
        response.status === 404 ||
        response.status === 405 ||
        !looksLikeJson;

      if (!shouldTryNext) {
        return { response, responseText, result, endpoint };
      }

      lastError = new Error(`Endpoint ${endpoint} returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No suitable submit endpoint found");
};

export const isSuccessfulSurveyResponse = (result, responseText) => {
  const normalizedResponseText = String(responseText || "").trim().toLowerCase();

  return (
    result?.success === true ||
    result?.result === "success" ||
    result?.status === "success" ||
    normalizedResponseText === "success" ||
    normalizedResponseText.includes('"success"')
  );
};
