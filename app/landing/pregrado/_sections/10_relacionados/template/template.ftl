<div class="related-programs__carousel swiper">
  <div class="related-programs__wrapper related-programs-swiper">
    <div class="related-programs__slides swiper-wrapper" role="list">
      <#if PROGRAM.getSiblings()?has_content>
        <#list PROGRAM.getSiblings() as cur_PROGRAM>
          <div class="related-programs__slide swiper-slide" role="listitem">
            <div class="related-programs__program-card">
              <div class="related-programs__image-container">
                <#if (cur_PROGRAM.IMAGE.getData())??>
                  <img
                    src="${cur_PROGRAM.IMAGE.getData()}"
                    alt="<#if (cur_PROGRAM.ALT.getData())??>${cur_PROGRAM.ALT.getData()}<#else>Programa Relacionado</#if>"
                    class="related-programs__image"
                    loading="lazy"
                  />
                <#else>
                  <img
                    src="[#default-image]"
                    alt="Programa Relacionado"
                    class="related-programs__image"
                    loading="lazy"
                  />
                </#if>
                <div class="related-programs__overlay"></div>
                <div class="related-programs__content">
                  <h3 class="related-programs__name">
                    <#if (cur_PROGRAM.NAME.getData())??>
                      ${cur_PROGRAM.NAME.getData()}
                    <#else>
                      Programa Relacionado
                    </#if>
                  </h3>
                  <p class="related-programs__faculty paragraph">
                    <#if (cur_PROGRAM.FACULTY.getData())??>
                      ${cur_PROGRAM.FACULTY.getData()}
                    <#else>
                      Facultad
                    </#if>
                  </p>
                  <#if (cur_PROGRAM.URL.getData())??>
                    <a
                      href="${cur_PROGRAM.URL.getData()}"
                      class="related-programs__link"
                      aria-label="Ver detalles del programa: <#if (cur_PROGRAM.NAME.getData())??>${cur_PROGRAM.NAME.getData()}<#else>Programa Relacionado</#if>">
                      Ver Programa <i class="ph ph-arrow-up-right"></i>
                    </a>
                  <#else>
                    <a
                      href="#"
                      class="related-programs__link"
                      aria-label="Ver detalles del programa">
                      Ver Programa <i class="ph ph-arrow-up-right"></i>
                    </a>
                  </#if>
                </div>
              </div>
            </div>
          </div>
        </#list>
      <#else>
        <!-- Fallback: mostrar programas por defecto si no hay datos -->
        <div class="related-programs__slide swiper-slide" role="listitem">
          <div class="related-programs__program-card">
            <div class="related-programs__image-container">
              <img
                src="[#default-image-1]"
                alt="Especialización en Gerencia de Proyectos TI"
                class="related-programs__image"
                loading="lazy"
              />
              <div class="related-programs__overlay"></div>
              <div class="related-programs__content">
                <h3 class="related-programs__name">Especialización en Gerencia de Proyectos TI</h3>
                <p class="related-programs__faculty paragraph">Facultad de Ingeniería</p>
                <a href="#" class="related-programs__link" aria-label="Ver detalles del programa">
                  Ver Programa <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="related-programs__slide swiper-slide" role="listitem">
          <div class="related-programs__program-card">
            <div class="related-programs__image-container">
              <img
                src="[#default-image-2]"
                alt="Pregrado en Ingeniería de Sistemas"
                class="related-programs__image"
                loading="lazy"
              />
              <div class="related-programs__overlay"></div>
              <div class="related-programs__content">
                <h3 class="related-programs__name">Pregrado en Ingeniería de Sistemas</h3>
                <p class="related-programs__faculty paragraph">Facultad de Ingeniería</p>
                <a href="#" class="related-programs__link" aria-label="Ver detalles del programa">
                  Ver Programa <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="related-programs__slide swiper-slide" role="listitem">
          <div class="related-programs__program-card">
            <div class="related-programs__image-container">
              <img
                src="[#default-image-3]"
                alt="Pregrado en Ingeniería Industrial"
                class="related-programs__image"
                loading="lazy"
              />
              <div class="related-programs__overlay"></div>
              <div class="related-programs__content">
                <h3 class="related-programs__name">Pregrado en Ingeniería Industrial</h3>
                <p class="related-programs__faculty paragraph">Facultad de Ingeniería</p>
                <a href="#" class="related-programs__link" aria-label="Ver detalles del programa">
                  Ver Programa <i class="ph ph-arrow-up-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </#if>
    </div>
    <div class="swiper-pagination related-programs__pagination" role="tablist" aria-label="Control de páginas del carrusel"></div>
    <button class="swiper-slide-button related-programs__prev" aria-label="Ver programas anteriores" type="button">
      <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
    </button>
    <button class="swiper-slide-button related-programs__next" aria-label="Ver más programas" type="button">
      <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
    </button>
  </div>
</div>