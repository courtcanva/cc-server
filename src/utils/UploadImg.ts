const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;

const setupS3ClientWithCognito = async () => {
  const { S3Client } = await import("@aws-sdk/client-s3");
  const { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } = await import(
    "@aws-sdk/client-cognito-identity"
  );
  const identityClient = new CognitoIdentityClient({ region: bucketRegion });
  const identityId = await identityClient.send(
    new GetIdCommand({ IdentityPoolId: IdentityPoolId }),
  );
  const { Credentials } = await identityClient.send(
    new GetCredentialsForIdentityCommand({ IdentityId: identityId.IdentityId }),
  );
  const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
      accessKeyId: Credentials?.AccessKeyId || "",
      secretAccessKey: Credentials?.SecretKey || "",
      sessionToken: Credentials?.SessionToken || "",
    },
  });
  return s3;
};

export const upLoadImgTo3S = async (img: string) => {
  const { nanoid } = await import("nanoid");
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  const photoKey = albumPhotosKey + nanoid() + ".jpeg";
  const { PutObjectCommand } = await import("@aws-sdk/client-s3");
  const imgBuffer = Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), "base64");
  try {
    const s3Client = await setupS3ClientWithCognito();
    const upload = new PutObjectCommand({
      Bucket: albumBucketName,
      Key: photoKey,
      Body: imgBuffer,
      ContentType: "image/jpeg",
    });
    await s3Client.send(upload);
    const imageUrl = `https://${albumBucketName}.s3.${bucketRegion}.amazonaws.com/${photoKey}`;
    return imageUrl;
  } catch (error) {
    return error;
  }
};

export const deleteImgInS3 = async (imageUrl: string) => {
  const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
  const photoKey = imageUrl.split("amazonaws.com/")[1] as string;
  const s3Client = await setupS3ClientWithCognito();
  const deleteCommand = new DeleteObjectCommand({ Bucket: albumBucketName, Key: photoKey });
  s3Client.send(deleteCommand);
};
