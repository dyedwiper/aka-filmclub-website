import { postImageFromWysiwygEditor } from './services/imageServices';

export function uploadImage(image, setValidationErrors) {
    const formData = new FormData();
    formData.append('image', image);
    return postImageFromWysiwygEditor(formData)
        .then((res) => {
            return { data: { link: res.data } };
        })
        .catch((err) => {
            if (err.response.status === 422) {
                setValidationErrors(err.response.data.validationErrors);
            }
        });
}
