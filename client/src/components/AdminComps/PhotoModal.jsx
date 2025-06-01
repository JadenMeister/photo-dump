import { Dialog, Portal, Stack, CloseButton } from "@chakra-ui/react";

export default function PhotoModal({ isOpen, onClose, photos }) {
  console.log("모달 뜸 ") // 디버깅용
  return (
      <Dialog.Root open={isOpen} onChange={(open)=> !open && onClose()}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className=" w-[800px] bg-white rounded-lg shadow-lg p-5 flex ">
              <Stack spacing={4}>
                {photos.map((photo) => (
                    <div key={photo.id} className="flex flex-col items-center">
                      <img
                          src={photo.photo_url}
                          alt={photo.country_name}
                          className="w-full h-auto rounded-lg mb-2"
                      />
                      <h3 className="text-lg font-semibold">{photo.country_name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(photo.travel_date).toLocaleDateString()}
                      </p>
                    </div>
                ))}
              </Stack>
              <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" color="white" onClick={onClose}/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
  );
}