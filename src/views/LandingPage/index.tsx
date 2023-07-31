import { init } from 'kuido-sdk'
import { Options } from 'kuido-sdk/lib/adapters/auth';
import {AccessTimeFilled} from '@mui/icons-material';
import {
  BasicList,
  BasicListProps,
  NavListProps,
  BasicListItem,
  BasicListWithNavLink,
  BasicCard,
  BasicCardProps,
    KuidoTheme
} from "ui-widgets"

type Props = {}

const LandingPage = (props: Props) => {

  const basicCardConfig: BasicCardProps = {
    title: 'Devices',
    onInitGet: (): Promise<number> => {
    return new Promise((resolve, reject) => resolve(4
    ));
  },
    minValue: 5,
    maxValue: 10,
  }

  return (
      <KuidoTheme>
        {/*<BasicCard {...basicCardConfigs} />*/}
        {/*<Helloworld text={'hshs'}/>*/}
        {/*<BasicList {...basicCardConfig} />*/}
        <BasicCard {...basicCardConfig} />
        {/*<BasicListWithNavLink {...navListConfig} />*/}
      </KuidoTheme>
  )
}

export default LandingPage