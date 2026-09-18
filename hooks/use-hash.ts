"use client";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

// Tiny external store for the current URL hash. Next's router.push("#id")
// uses pushState, which never fires `hashchange`, so navigations made through
// this app call setCurrentHash() explicitly; browser back/forward and manual
// hash edits are picked up via the popstate/hashchange listeners.
type Listener = () => void;
const listeners = new Set<Listener>();
let current: string | undefined;

const readFromLocation = () => {
  current = window.location.hash;
};

const emit = () => listeners.forEach((listener) => listener());

export function setCurrentHash(hash: string) {
  current = hash.startsWith("#") ? hash : `#${hash}`;
  emit();
}

const subscribe = (listener: Listener) => {
  const onChange = () => {
    readFromLocation();
    emit();
  };
  listeners.add(listener);
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};

const getSnapshot = () => {
  if (current === undefined) readFromLocation();
  return current;
};

const getServerSnapshot = () => undefined;

export default function useHash() {
  const router = useRouter();
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateHash = (newHash: string) => {
    setCurrentHash(newHash);
    router.push(`#${newHash}`, { scroll: false });
  };

  return { hash, updateHash };
}
