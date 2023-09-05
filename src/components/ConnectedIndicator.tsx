import { type FC } from "react";
import { Badge } from "./ui/badge";

interface Props {
  connected: boolean;
}

const ConnectedIndicator: FC<Props> = ({ connected }) => {
  if (!connected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Connecting...
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Connected
    </Badge>
  );
};

export default ConnectedIndicator;
