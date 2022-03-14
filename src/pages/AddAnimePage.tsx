import { ChangeEvent, useEffect, useState } from "react";
// FIREBASE
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "src/config/db";
import { doc, setDoc, updateDoc } from "firebase/firestore";
// DEPENDENCIES
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
// REACT ICONS
import { MdArrowBackIosNew, MdDelete } from "react-icons/md";
// REDUX
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAnimeById } from "src/features/anime/animeSlice";
// COMPONENTS
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import SectionTitle from "src/components/SectionTitle";
import AlertModal from "src/components/Modal/AlertModal";
import Loader from "src/components/Loader";
// TYPES
import { Anime } from "src/types/AnimeTypes";

function AddAnimePage() {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { anime } = useAppSelector((state) => state.anime);
  const isEditPage = location.pathname.split("/")[2] === "edit-anime";
  const params = useParams();

  const defaultFormData: Anime = {
    id: isEditPage ? anime.id : "",
    slug: isEditPage ? anime.slug : "",
    title: isEditPage ? anime.title : "",
    category: isEditPage ? anime.category : "uncategoried",
    genre: isEditPage ? anime.genre : "unknown",
    region: isEditPage ? anime.region : "unknown",
    directedBy: isEditPage ? anime.directedBy : "",
    releaseYear: isEditPage ? anime.releaseYear : "",
    description: isEditPage ? anime.description : "",
    coverImage: "",
    bannerImage: "",
    featureImage: "",
    galleries: [],
    likes: 0,
    contributedBy: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("uploading_idle");
  const [formData, setFormData] = useState<Anime>(defaultFormData);
  const [coverImageUrl, setCoverImageUrl] = useState<null | string>(
    isEditPage ? anime.coverImage : null
  );
  const [bannerImageUrl, setBannerImageUrl] = useState<null | string>(
    isEditPage ? anime.bannerImage : null
  );
  const [featureImageUrl, setFeatureImageUrl] = useState<null | string>(
    isEditPage ? anime.featureImage : null
  );
  const [galleriesUrl, setGalleriesUrl] = useState<null | string[]>(
    isEditPage ? anime.galleries : null
  );
  const [message, setMessage] = useState<string>("");

  // Declare form variables
  const {
    title,
    category,
    genre,
    region,
    directedBy,
    releaseYear,
    description,
  } = formData;

  // Generate timestamp
  const timestamp = Math.round(+new Date() / 1000);

  useEffect(() => {
    if (user === null) {
      navigator("/");
    }
    if (isEditPage && params.id) {
      dispatch(getAnimeById(`${params.id}`));
    }
  }, [params.id, dispatch, isEditPage, navigator, user]);

  // Handle Input value change
  const handleValueChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadSingleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0].name) {
        const storageRef = ref(
          storage,
          "images/" + timestamp + e.target.files[0].name
        );
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        setUploadStatus(`uploading_${e.target.name}`);

        if ((await uploadTask).state === "success") {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const targetName = e.target.name;

          if (targetName === "coverImage") {
            setCoverImageUrl(url);
          } else if (targetName === "bannerImage") {
            setBannerImageUrl(url);
          } else if (targetName === "featureImage") {
            setFeatureImageUrl(url);
          }
          setUploadStatus("uploading_idle");
          e.target.value = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadGalleries = async (e: ChangeEvent<HTMLInputElement>) => {
    let galleryArray: string[] = [];
    setUploadStatus(`uploading_galleries`);
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const storageRef = ref(
          storage,
          "images/" + timestamp + e.target.files[i].name
        );

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[i]);

        if ((await uploadTask).state === "running") {
          setUploadStatus("uploading");
        }

        if ((await uploadTask).state === "success") {
          const url = await getDownloadURL(uploadTask.snapshot.ref);

          galleryArray.push(url);
          if (galleriesUrl !== null && galleriesUrl.length > 0) {
            galleryArray = galleriesUrl.concat(galleryArray);
          }
        }
      }

      setGalleriesUrl(galleryArray);
      setUploadStatus("uploading_idle");
      e.target.value = "";
    }
  };

  const deleteImage = async (
    imageType: "coverImage" | "bannerImage" | "featureImage" | "galleries",
    url: string
  ) => {
    const storage = getStorage();
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    if (imageType === "coverImage") {
      setCoverImageUrl(null);
    }
    if (imageType === "bannerImage") {
      setBannerImageUrl(null);
    }
    if (imageType === "featureImage") {
      setFeatureImageUrl(null);
    }
    if (imageType === "galleries") {
      const newGalleries = galleriesUrl?.filter((imgUrl) => imgUrl !== url);
      newGalleries && setGalleriesUrl(newGalleries);
    }
  };

  const addAnimeHandler = async (e: any) => {
    e.preventDefault();

    const {
      title,
      category,
      genre,
      region,
      directedBy,
      releaseYear,
      description,
    } = formData;

    if (
      coverImageUrl === null ||
      bannerImageUrl === null ||
      featureImageUrl === null ||
      galleriesUrl === null ||
      !title ||
      !directedBy ||
      !releaseYear ||
      !description
    ) {
      setMessage("Please make sure filling all the input filed.");
      setIsOpen(true);
    } else {
      setUploadStatus("creating");
      const getSlug = title.split(" ").join("-");
      const docId = getSlug.concat(`-${String(timestamp)}`);

      await setDoc(doc(db, "anime_list", docId), {
        id: docId,
        title,
        category,
        genre,
        region,
        directedBy,
        releaseYear,
        description,
        likes: 0,
        slug: getSlug,
        contributedBy: user?.uid,
        coverImage: coverImageUrl,
        bannerImage: bannerImageUrl,
        featureImage: featureImageUrl,
        galleries: galleriesUrl,
      });

      setCoverImageUrl(null);
      setBannerImageUrl(null);
      setFeatureImageUrl(null);
      setGalleriesUrl(null);
      setFormData(defaultFormData);
      setUploadStatus("idle");
      navigator("/categories");
    }
  };

  const updateAnimeHandler = async (e: any) => {
    e.preventDefault();
    const {
      title,
      category,
      genre,
      region,
      directedBy,
      releaseYear,
      description,
    } = formData;

    if (
      coverImageUrl === null ||
      bannerImageUrl === null ||
      featureImageUrl === null ||
      galleriesUrl === null ||
      !title ||
      !directedBy ||
      !releaseYear ||
      !description
    ) {
      setMessage("Please make sure filling all the input filed.");
      setIsOpen(true);
    } else {
      setUploadStatus("updating");
      const getSlug = title.split(" ").join("-");

      const animeRef = doc(db, "anime_list", anime.id);

      await updateDoc(animeRef, {
        title,
        category,
        genre,
        region,
        directedBy,
        releaseYear,
        description,
        slug: getSlug,
        coverImage: coverImageUrl,
        bannerImage: bannerImageUrl,
        featureImage: featureImageUrl,
        galleries: galleriesUrl,
      });

      setCoverImageUrl(null);
      setBannerImageUrl(null);
      setFeatureImageUrl(null);
      setGalleriesUrl(null);
      setFormData(defaultFormData);
      setUploadStatus("idle");
      setIsOpen(true);
      navigator("/profile");
    }
  };

  return (
    <Layout>
      {uploadStatus === "creating" && <Loader />}
      <AlertModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={message}
        type={"error"}
      />
      <Hero
        heroType="heroSub"
        height="300px"
        bgImage={isEditPage ? `${anime.bannerImage}` : "/images/bg_galaxy.png"}
      >
        <Container className="flex h-full flex-col items-start justify-center space-y-4">
          <div className="mb-4 w-full">
            <div
              className="flex w-fit items-center text-lg hover:text-sky-500"
              onClick={() => navigator(-1)}
            >
              <MdArrowBackIosNew />
              Back
            </div>
          </div>

          <div className="flex w-full flex-col items-center space-y-3">
            <Text as="h2" className="font-title text-sky-500">
              {isEditPage ? "Edit Anime" : " Add Anime"}
            </Text>
          </div>
        </Container>
      </Hero>
      <Container>
        <section>
          <SectionTitle title="My Animes" />
          <form
            className="h-fit w-full rounded-2xl bg-slate-800 px-6  py-6"
            onSubmit={isEditPage ? updateAnimeHandler : addAnimeHandler}
          >
            <div className="w-full">
              <div className="flex w-full gap-x-4">
                <div className="my-2 w-full space-y-1 ">
                  <Text
                    as="label"
                    htmlFor="title"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Anime Title
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Anime Title"
                    onChange={handleValueChange}
                  />
                </div>
                {/* ============================================ */}
                <div className="my-2 w-full space-y-1">
                  <Text
                    as="label"
                    htmlFor="title"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Category
                  </Text>
                  <select
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[.6em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    id="grid-state"
                    name="category"
                    value={category}
                    onChange={handleValueChange}
                  >
                    <option>Uncategoried</option>
                    <option>80s</option>
                    <option>90s</option>
                  </select>
                </div>
                {/* ============================================ */}
                <div className="my-2 w-full space-y-1">
                  <Text
                    as="label"
                    htmlFor="genre"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Genre
                  </Text>
                  <select
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[.6em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    id="grid-state"
                    name="genre"
                    value={genre}
                    onChange={handleValueChange}
                  >
                    <option>Unknown</option>
                    <option>Sci-Fi</option>
                    <option>Action</option>
                  </select>
                </div>
              </div>
              {/* ================ ROW ================= */}
              <div className="flex w-full gap-x-4">
                <div className="my-2 w-full space-y-1">
                  <Text
                    as="label"
                    htmlFor="region"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Region
                  </Text>
                  <select
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[.6em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    id="grid-state"
                    name="region"
                    value={region}
                    onChange={handleValueChange}
                  >
                    <option>Unknown</option>
                    <option>Japan</option>
                    <option>US</option>
                  </select>
                </div>
                {/* ============================================ */}
                <div className="my-2 w-full space-y-1 ">
                  <Text
                    as="label"
                    htmlFor="directed-by"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Directed By
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="text"
                    placeholder="Directed By"
                    name="directedBy"
                    value={directedBy}
                    onChange={handleValueChange}
                  />
                </div>
                {/* ============================================ */}
                <div className="my-2 w-full space-y-1 ">
                  <Text
                    as="label"
                    htmlFor="release-year"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Release Year
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="text"
                    placeholder="Release Year"
                    name="releaseYear"
                    value={releaseYear}
                    onChange={handleValueChange}
                  />
                </div>
                {/* ============================================ */}
              </div>
              {/* ================ ROW ================= */}
              <div className="flex w-full gap-x-4">
                <div className="my-2 w-full space-y-1 ">
                  <Text
                    as="label"
                    htmlFor="description"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Description
                  </Text>
                  <textarea
                    className="w-full rounded-xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    rows={10}
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleValueChange}
                  />
                </div>
              </div>
              {/* ================ ROW ================= */}
              <div className="flex w-full gap-x-4">
                <div className="my-2 w-full space-y-1 ">
                  <div className="mx-auto mb-2 w-[90%] rounded-md border-[1px] border-slate-700 py-4">
                    {coverImageUrl === null ? (
                      <div className="relative">
                        {uploadStatus === "uploading_coverImage" && (
                          <div className="absolute left-[50%] top-[50%] flex translate-y-[-50%] translate-x-[-50%] items-center justify-center">
                            <ThreeDots color="#0ba5e9" />
                          </div>
                        )}
                        <img
                          className={`mx-auto h-[200px] opacity-50`}
                          src="/images/image_placeholder.png"
                          alt="image_placeholder"
                        />
                      </div>
                    ) : (
                      <div className="relative mx-auto h-[200px]">
                        <img
                          className="mx-auto mb-4 h-full"
                          src={`${coverImageUrl}`}
                          alt="image_placeholder"
                        />
                        <button
                          className="absolute top-0 right-4 rounded bg-slate-500/50 p-1 text-3xl text-red-600 transition hover:bg-slate-400/50"
                          onClick={() =>
                            deleteImage("coverImage", coverImageUrl)
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                  <Text
                    as="label"
                    htmlFor="cover-image"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Cover Image
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-500 file:py-1 file:px-2 file:font-semibold placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="file"
                    name="coverImage"
                    placeholder="Cover Image"
                    onChange={uploadSingleImage}
                  />
                </div>
                {/* ==================== BANNER IMAGE ====================== */}
                <div className="my-2 w-full space-y-1 ">
                  <div className="mx-auto mb-2 w-[90%] rounded-md border-[1px] border-slate-700 py-4">
                    {bannerImageUrl === null ? (
                      <div className="relative">
                        {uploadStatus === "uploading_bannerImage" && (
                          <div className="absolute left-[50%] top-[50%] flex translate-y-[-50%] translate-x-[-50%] items-center justify-center">
                            <ThreeDots color="#0ba5e9" />
                          </div>
                        )}
                        <img
                          className={`mx-auto h-[200px] opacity-50`}
                          src="/images/image_placeholder.png"
                          alt="image_placeholder"
                        />
                      </div>
                    ) : (
                      <div className="relative mx-auto h-[200px]">
                        <img
                          className="mx-auto mb-4 h-full"
                          src={`${bannerImageUrl}`}
                          alt="image_placeholder"
                        />
                        <button
                          className="absolute top-0 right-4 rounded bg-slate-500/50 p-1 text-3xl text-red-600 transition hover:bg-slate-400/50"
                          onClick={() =>
                            deleteImage("bannerImage", bannerImageUrl)
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                  <Text
                    as="label"
                    htmlFor="banner-image"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Banner Image
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-500 file:py-1 file:px-2 file:font-semibold placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="file"
                    name="bannerImage"
                    placeholder="Banner Image"
                    onChange={uploadSingleImage}
                  />
                </div>
                {/* =================== FEATURE IMAGE ===================== */}
                <div className="my-2 w-full space-y-1 ">
                  <div className="mx-auto mb-2 w-[90%] rounded-md border-[1px] border-slate-700 py-4">
                    {featureImageUrl === null ? (
                      <div className="relative">
                        {uploadStatus === "uploading_featureImage" && (
                          <div className="absolute left-[50%] top-[50%] flex translate-y-[-50%] translate-x-[-50%] items-center justify-center">
                            <ThreeDots color="#0ba5e9" />
                          </div>
                        )}
                        <img
                          className={`mx-auto h-[200px] opacity-50`}
                          src="/images/image_placeholder.png"
                          alt="image_placeholder"
                        />
                      </div>
                    ) : (
                      <div className="relative mx-auto h-[200px]">
                        <img
                          className="mx-auto mb-4 h-full"
                          src={`${featureImageUrl}`}
                          alt="image_placeholder"
                        />
                        <button
                          className="absolute top-0 right-4 rounded bg-slate-500/50 p-1 text-3xl text-red-600 transition hover:bg-slate-400/50"
                          onClick={() =>
                            deleteImage("featureImage", featureImageUrl)
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                  <Text
                    as="label"
                    htmlFor="feature-image"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Feature Image
                  </Text>
                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-500 file:py-1 file:px-2 file:font-semibold placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="file"
                    name="featureImage"
                    placeholder="Feature Image"
                    onChange={uploadSingleImage}
                  />
                </div>
              </div>
              {/* ================ GALLERIES ================= */}
              <div className="flex w-full gap-x-4">
                <div className="my-2 w-full space-y-1 ">
                  {uploadStatus === "uploading_galleries" && (
                    <div className="flex items-center justify-center">
                      <ThreeDots color="#0ba5e9" />
                    </div>
                  )}
                  <div className="grid grid-cols-4">
                    {galleriesUrl &&
                      galleriesUrl.map((img) => (
                        <div
                          className="mx-auto mb-2 w-[90%] rounded-md border-[1px] border-slate-700 py-4"
                          key={img}
                        >
                          <div className="relative mx-auto h-[200px]">
                            <img
                              className="mx-auto mb-4 h-full w-auto"
                              src={`${img}`}
                              alt="image_placeholder"
                            />
                            <button
                              className="absolute top-0 right-4 rounded bg-slate-500/50 p-1 text-3xl text-red-600 transition hover:bg-slate-400/50"
                              onClick={() => deleteImage("galleries", img)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <Text
                    as="label"
                    htmlFor="gallery"
                    className="pl-4 font-semibold text-sky-500"
                  >
                    Galleries
                  </Text>

                  <input
                    className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-500 file:py-1 file:px-2 file:font-semibold placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                    type="file"
                    multiple
                    name="galleries"
                    onChange={uploadGalleries}
                  />
                </div>
              </div>

              {/* =========== Submit Button ============ */}
              <div className="flex justify-center space-y-4 pt-7">
                {isEditPage ? (
                  <input
                    className="btn btn-primary min-w-[200px]  disabled:cursor-not-allowed disabled:bg-sky-600 disabled:hover:bg-sky-600 disabled:hover:text-slate-900"
                    type="submit"
                    value={
                      uploadStatus === "updating" ? "Updating..." : "Update"
                    }
                    disabled={
                      uploadStatus === "updating" ||
                      uploadStatus === "uploading_featureImage" ||
                      uploadStatus === "uploading_coverImage" ||
                      uploadStatus === "uploading_bannerImage" ||
                      uploadStatus === "uploading_galleries"
                        ? true
                        : false
                    }
                  />
                ) : (
                  <input
                    className="btn btn-primary min-w-[200px]  disabled:cursor-not-allowed disabled:bg-sky-600 disabled:hover:bg-sky-600 disabled:hover:text-slate-900"
                    type="submit"
                    value={
                      uploadStatus === "creating" ? "Creating..." : "Create"
                    }
                    disabled={
                      uploadStatus === "creating" ||
                      uploadStatus === "uploading_featureImage" ||
                      uploadStatus === "uploading_coverImage" ||
                      uploadStatus === "uploading_bannerImage" ||
                      uploadStatus === "uploading_galleries"
                        ? true
                        : false
                    }
                  />
                )}
              </div>
            </div>
          </form>
        </section>
      </Container>
    </Layout>
  );
}
export default AddAnimePage;
