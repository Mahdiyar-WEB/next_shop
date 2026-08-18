"use client";
import { useEffect, useState } from "react";
export default function useDelayedLoading(isLoading: boolean, delay = 250) { const [visible, setVisible] = useState(false); useEffect(() => { const timer = setTimeout(() => setVisible(isLoading), isLoading ? delay : 0); return () => clearTimeout(timer); }, [isLoading, delay]); return visible; }
