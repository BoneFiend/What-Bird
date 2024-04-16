import logo from '../../assets/LOGO-DRAWING.png'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
}

export const Navbar = ({ setIsInfoModalOpen }: Props) => {
  return (
    <>
      <div className="mx-2 flex h-16 items-center justify-between px-2 transition-all sm:h-28">
        <div className="flex h-full items-center">
          <img src={logo} alt="What Bird" className="h-full" />
          <div className="pl-2 font-mono text-4xl font-semibold text-yellow-200 sm:text-6xl">
            What Bird
          </div>
        </div>

        <div>
          <InformationCircleIcon
            className="h-7 cursor-pointer text-slate-300 transition-all hover:scale-125 sm:h-10"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
      </div>
    </>
  )
}
