import { IDeviceModel } from "../api/auth";

export const getPosition = (): Promise<GeolocationCoordinates | null> => {
    return new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        () => resolve(null)
      )
    );
  };

export const getDeviceData = async (): Promise<IDeviceModel> => {
    const position = await getPosition();

    return {
      isLogued: false,
      isRegistred: false,
      agent: navigator.userAgent,
      language: navigator.language,
      resolution: [window.screen.width, window.screen.height],
      location: position ? [position.latitude, position.longitude] : [0, 0],
    } as IDeviceModel;
  };