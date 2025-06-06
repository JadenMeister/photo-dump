import {Dialog, Portal, Stack, CloseButton, GridItem, Grid} from "@chakra-ui/react";


export default function PhotoModal({ isOpen, onClose, photos }) {




  const photoCountry = photos.reduce((acc,photo)=>{
    if (!acc[photo.country_name]) {
      acc[photo.country_name] = [];
    }
    acc[photo.country_name].push(photo);
    return acc;
  }, {});



  return (
      <Dialog.Root open={isOpen} onChange={(open)=> !open && onClose()}>
        <Portal>
          <Dialog.Backdrop onClick={e=>{if(e.target === e.currentTarget)onClose()}} />
          <Dialog.Positioner>
            <Dialog.Content className=" w-[800px] bg-white rounded-lg shadow-lg p-5 ">
              {Object.entries(photoCountry).map(([country, countryPhotos]) => (
                  <div key={country} className="mb-8">
                    <h3 className="text-xl font-bold mb-2 border-b">{country}</h3>
                    <Grid templateColumns="repeat(3, 1fr)" gap="6">
                      {countryPhotos.map((photo) => (
                          <GridItem key={photo.id} className="flex flex-col items-center">
                            <img
                                src={photo.photo_url}
                                alt={photo.country_name}
                                className="w-full h-auto rounded-lg mb-2"
                                style={{ height: '200px', maxHeight: '250px', objectFit: 'cover' }}
                            />
                          </GridItem>
                      ))}
                    </Grid>
                  </div>
              ))}
              <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" color="white" onClick={onClose}/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
  );
}