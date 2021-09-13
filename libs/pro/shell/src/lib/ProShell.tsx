import React, { FC } from 'react';
import { SharedShell } from '@homeproved/shared/shell';
import {HydrateProps} from "react-query/hydration";

type Props = {
  dehydratedState?: HydrateProps['state']
}

const ProShell: FC<Props> = ({ children, dehydratedState }) => <SharedShell dehydratedState={dehydratedState}>{children}</SharedShell>;

export default ProShell;
