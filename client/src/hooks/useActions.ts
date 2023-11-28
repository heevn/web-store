import { bindActionCreators } from "redux";
import { useAppDispatch } from "../store/hooks"
import { useMemo } from "react";
import { deviceActions } from "../store/slices/deviceSlice";
import { brandActions} from "../store/slices/brandSlice";
import { typeActions } from "../store/slices/typeSlice";
import { userActions } from "../store/slices/userSlice";
import { basketActions } from "../store/slices/basketSlice";
import { shopActions } from "../store/slices/shopSlice";

const rootActions = {
  ...userActions,
  ...typeActions,
  ...deviceActions,
  ...brandActions,
  ...basketActions,
  ...shopActions
}

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}