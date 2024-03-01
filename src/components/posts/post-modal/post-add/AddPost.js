import PostWrapper from '@components/posts/modal-wrappers/post-wrapper/PostWrapper';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@components/posts/post-modal/post-add/AddPost.scss';
import ModalBoxContent from '@components/posts/post-modal/modal-box-content/ModalBoxContent';
import Button from '@components/button/Button';
import { PostUtils } from '@services/utils/post-utils.service';
import { FaTimes } from 'react-icons/fa';
import { bgColors } from '@services/utils/static.data';
import ModalBoxSelection from '@components/posts/post-modal/modal-box-content/ModalBoxSelection';

const AddPost = () => {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const { gifUrl, image } = useSelector((state) => state.post);
  const [loading] = useState(false);
  const [postImage, setPostImage] = useState('');
  const [allowedNumberOfCharacters] = useState('100/100');
  const [textAreaBackground, setTextAreaBackground] = useState('#ffffff');
  const [postData, setPostData] = useState({
    post: '',
    bgColor: textAreaBackground,
    privacy: '',
    feelings: '',
    gifUrl: '',
    profilePicture: '',
    image: '',
    video: ''
  });
  const [disable, setDisable] = useState(false);
  const [selectedPostItem, setSelectedPostImage] = useState();
  const counterRef = useRef(null);
  const dispatch = useDispatch();

  const maxNumberOfCharacters = 100;

  const selectBackground = (bgColor) => {
    console.log(selectedPostItem);
    PostUtils.selectBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable);
  };

  const postInputEditable = (event, textContent) => {
    const currentTextLength = event.target.textContent.length;
    const counter = maxNumberOfCharacters - currentTextLength;
    counterRef.current.textContent = `${counter}/100`;
    PostUtils.postInputEditable(textContent, postData, setPostData, setDisable);
  };

  const closePostModal = () => {
    PostUtils.closePostModal(dispatch);
  };

  const onKeyDown = (event) => {
    const currentTextLength = event.target.textContent.length;
    if (currentTextLength === maxNumberOfCharacters && event.keyCode !== 8) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (gifUrl) {
      setPostImage(gifUrl);
    } else if (image) {
      setPostImage(image);
    }
  }, [gifUrl, image]);

  return (
    <>
      <PostWrapper>
        <div></div>
        {!gifModalIsOpen && (
          <div className="modal-box">
            {loading && (
              <div className="modal-box-loading" data-testid="modal-box-loading">
                <span>Posting...</span>
              </div>
            )}
            <div className="modal-box-header">
              <h2>Create Post</h2>
              <button className="modal-box-header-cancel" onClick={() => closePostModal()}>
                X
              </button>
            </div>
            <hr />
            <ModalBoxContent />

            {!postImage && (
              <>
                <div
                  className="modal-box-form"
                  data-testid="modal-box-form"
                  style={{ background: `${textAreaBackground}` }}
                >
                  <div className="main" style={{ margin: textAreaBackground !== '#ffffff' ? '0 auto' : '' }}>
                    <div className="flex-row">
                      <div
                        data-testid="editable"
                        name="post"
                        className={`editable flex-item ${textAreaBackground !== '#ffffff' ? 'textInputColor' : ''}`}
                        contentEditable={true}
                        onInput={(e) => postInputEditable(e, e.currentTarget.textContent)}
                        onKeyDown={onKeyDown}
                        data-placeholder="What's on your mind?..."
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {postImage && (
              <>
                <div className="modal-box-image-form">
                  <div
                    data-testid="post-editable"
                    name="post"
                    className="post-input flex-item"
                    contentEditable={true}
                    data-placeholder="What's on your mind?..."
                  ></div>
                  <div className="image-display">
                    <div className="image-delete-btn" data-testid="image-delete-btn">
                      <FaTimes />
                    </div>
                    <img data-testid="post-image" className="post-image" src={`${postImage}`} alt="" />
                  </div>
                </div>
              </>
            )}

            <div className="modal-box-bg-colors">
              <ul>
                {bgColors.map((color, index) => (
                  <li
                    data-testid="bg-colors"
                    key={index}
                    className={`${color === '#ffffff' ? 'whiteColorBorder' : ''}`}
                    style={{ backgroundColor: `${color}` }}
                    onClick={() => selectBackground(color)}
                  ></li>
                ))}
              </ul>
            </div>
            <span className="char_count" data-testid="allowed-number" ref={counterRef}>
              {allowedNumberOfCharacters}
            </span>

            <ModalBoxSelection setSelectedPostImage={setSelectedPostImage} />

            <div className="modal-box-button" data-testid="post-button">
              <Button label="Create Post" className="post-button" disabled={disable} />
            </div>
          </div>
        )}
        {gifModalIsOpen && <div>Gif</div>}
      </PostWrapper>
    </>
  );
};

export default AddPost;
