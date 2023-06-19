export function getBase64(img: File, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function getAvatarSrc(
  avatarPreview: null | string | undefined,
  userPhoto: string | undefined,
  API_URL: string | undefined
): string | undefined {
  if (
    typeof avatarPreview === "undefined" &&
    typeof userPhoto === "string" &&
    userPhoto.startsWith("/uploads/")
  ) {
    const previewUrl = `${API_URL}${userPhoto}`;
    console.log("previewUrl", previewUrl);
    return previewUrl;
  } else {
    return userPhoto;
  }
}
