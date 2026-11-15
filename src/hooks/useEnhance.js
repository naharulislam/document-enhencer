"use client";

import { useState, useCallback } from "react";
import { enhanceImage } from "@/lib/api";
import { DEFAULT_SETTINGS } from "@/lib/utils";

export default function useEnhance() {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (f, s) => {
    setLoading(true);
    setError(null);
    try {
      const data = await enhanceImage(f, s);
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const selectFile = useCallback(
    (f) => {
      setFile(f);
      setResult(null);
      if (f) run(f, settings);
    },
    [run, settings]
  );

  const reprocess = useCallback(() => {
    if (file) run(file, settings);
  }, [file, settings, run]);

  const reset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    file,
    settings,
    setSettings,
    result,
    loading,
    error,
    selectFile,
    reprocess,
    reset,
  };
}