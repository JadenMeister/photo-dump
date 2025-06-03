import {Dialog, Portal, Stack, CloseButton, Flex, Grid} from "@chakra-ui/react";

export default function PhotoModal({ isOpen, onClose, photos }) {


  const sortedPhotos = [...photos].sort((a, b) => a.country_name.localeCompare(b.country_name));

let countryName = null;



  return (
      <Dialog.Root open={isOpen} onChange={(open)=> !open && onClose()}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className=" w-[800px] bg-white rounded-lg shadow-lg p-5 flex flex-col">
              <div className="flex-grow overflow-y-auto pr-2">
              <div className="grid grid-cols-3 gap-4">
                {sortedPhotos.map((photo,index) => {
                  const isNewCountry = photo.country_name !== countryName;
                  countryName = photo.country_name;

                  return (
                      <div key={photo.id} className="">
                        {isNewCountry && (
                            <div
                                key={`country-${photo.country_name}-${index}`}
                                className="col-span-3 mb-2"
                            >
                              <h3 className="text-lg font-semibold border-b pb-2 text-left">
                                {photo.country_name}
                              </h3>
                            </div>
                        )}
                        <img
                            src={photo.photo_url}
                            alt={photo.country_name}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                      </div>
                  );
                })}
              </div>
              </div>

              <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" color="white" onClick={onClose}/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
  );
}