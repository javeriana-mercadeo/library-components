const BlogFeatured = () => {
  return (
    <div>
      {/* <!-- Blog subtitulo --> */}
      <div className='mx-auto max-w-screen-xl px-4 py-8 pb-0 text-[var(--neutral-100)] sm:pb-0 sm:px-6 sm:py-12 lg:px-8'>
        <h2 className='text-center text-xl font-bold text-[var(--primary-700)] sm:text-3xl'>Titulo para blogs destacados</h2>

        <p className='text-center mt-4 text-[var(--neutral-200)]'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam.
        </p>
      </div>

      {/* <!-- Blog destacados --> */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-8 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 m-auto overflow-hidden'>
        <div className='rounded-lg lg:col-span-2 h-full'>
          <article className='blog-important m-auto'>
            <div className='blog-important-container'>
              <div className='blog-slider'>
                <div className='blog-slider__wrp swiper-wrapper'>
                  <div className='blog-slider__item swiper-slide'>
                    <div className='blog-slider__img'>
                      <img
                        src='https://i.pinimg.com/736x/e4/24/10/e424107bec570f1c5089a265f669057f.jpg'
                        alt=''
                        className='slider-img'
                        loading='lazy'
                      />
                    </div>
                    <div className='blog-slider__content'>
                      <div className='p-4 sm:p-6'>
                        <a href='#'>
                          <h3 className='text-lg font-medium text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        </a>

                        <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-500'>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus
                          nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates
                          neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>

                        <a href='#' className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600'>
                          Find out more
                          <span aria-hidden='true' className='block transition-all group-hover:ms-0.5 rtl:rotate-180'>
                            &rarr;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className='blog-slider__item swiper-slide'>
                    <div className='blog-slider__img'>
                      <img
                        src='https://i.pinimg.com/736x/86/a6/13/86a6132554b67c3200a00e254da44853.jpg'
                        alt=''
                        className='slider-img'
                        loading='lazy'
                      />
                    </div>
                    <div className='blog-slider__content'>
                      <div className='p-4 sm:p-6'>
                        <a href='#'>
                          <h3 className='text-lg font-medium text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        </a>

                        <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-500'>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus
                          nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates
                          neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?
                        </p>

                        <a href='#' className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600'>
                          Find out more
                          <span aria-hidden='true' className='block transition-all group-hover:ms-0.5 rtl:rotate-180'>
                            &rarr;
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='blog-slider__pagination'></div>
              </div>
            </div>
          </article>
        </div>
        <div className='rounded-lg h-full flex content-center'>
          <article className='overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs'>
            <img
              alt=''
              src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              className='h-56 w-full object-cover'
              loading='lazy'
            />

            <div className='p-4 sm:p-6'>
              <a href='#'>
                <h3 className='text-lg font-medium text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
              </a>

              <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-500'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt
                praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora
                nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?
              </p>

              <a href='#' className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600'>
                Find out more
                <span aria-hidden='true' className='block transition-all group-hover:ms-0.5 rtl:rotate-180'>
                  &rarr;
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default BlogFeatured
