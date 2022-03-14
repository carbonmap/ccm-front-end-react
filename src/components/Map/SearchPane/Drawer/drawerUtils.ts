import { modalController } from "@ionic/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "src/redux/store";

export const useNavigateBottomDrawer = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile);
  const history = useHistory();
  const navigateDrawer = async (newUrl: string) => {
    if (isMobile) {
      await modalController.dismiss({
        dismissed: true,
      });
    }
    history.push(newUrl);
  };

  return { navigateDrawer };
};
