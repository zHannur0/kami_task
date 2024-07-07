import { useDispatch } from "react-redux";
import {AppDispatch} from "../store/store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();
