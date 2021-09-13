import { Icons } from '@homeproved/shared/ui';
import { Theme } from '@material-ui/core';

export enum PlanUid {
  FREE = 'free',
  LITE = 'lite',
  PLUS = 'plus',
  TEAM = 'team',
}

export const getIconByPlanUid = (uid: string) => {
  switch (uid) {
    case PlanUid.FREE:
      return Icons.QUOTE;
    case PlanUid.LITE:
      return Icons.GEAR;
    case PlanUid.PLUS:
      return Icons.WRENCH;
    default:
      return Icons.HELMET_SOLID;
  }
};

export const getIconColorByPlanUid = (uid: string, theme: Theme) => {
  switch (uid) {
    case PlanUid.FREE:
      return theme.palette.grey['A200'];
    case PlanUid.LITE:
    case PlanUid.PLUS:
      return theme.palette.grey['800'];
    default:
      return 'gradient';
  }
};
