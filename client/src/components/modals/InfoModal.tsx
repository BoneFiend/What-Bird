import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Information
            </ModalHeader>
            <ModalBody>
              <p>What Bird is a natural language bird identification app.</p>
              <p>
                Its predictions are powered by{' '}
                <a
                  href="https://openai.com/research/gpt-4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 visited:text-purple-600"
                >
                  OpenAI's GPT-4-Turbo
                </a>{' '}
                and it uses taxonomic information from{' '}
                <a
                  href="https://ebird.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 visited:text-purple-600"
                >
                  eBird.org
                </a>
                . Photos are supplied via{' '}
                <a
                  href="https://www.flickr.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 visited:text-purple-600"
                >
                  flikr.com
                </a>
                .
              </p>
              <p>
                This is an open source software. You can find the source code
                for it{' '}
                <a
                  href="https://github.com/BoneFiend/What-Bird"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 visited:text-purple-600"
                >
                  here
                </a>
                .
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
