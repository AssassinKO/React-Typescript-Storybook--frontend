import React, { FC } from 'react';
import {HydrateProps} from "react-query/hydration";
import { SharedShell } from '@homeproved/shared/shell';

type Props = {
  dehydratedState?: HydrateProps['state']
}

const ComShell: FC<Props> = ({ children, dehydratedState }) => <SharedShell dehydratedState={dehydratedState}>{children}</SharedShell>;

export default ComShell;
