<template>
  <section id="getinvolved">
    <div class="container mx-auto px-4 pt-6 pb-4 md:py-16">
      <div
        class="flex flex-wrap flex-col justify-center text-center max-w-prose mx-auto"
      >
        <h1 class="pb-6 text-5xl">Get Involved!</h1>

        <p class="text-justify">
          JabRef was founded 2003 and has since been used by many students and
          researchers. Our mission is to advance knowledge and improve
          scientific research. We value open access to information and believe
          modern science can built on an open institutional structure. This is
          why we develop JabRef as
          <a
            class="text-reset"
            href="https://github.com/JabRef/jabref"
          >
            free open-source software
          </a>
          and save your data in a
          <a
            class="text-reset"
            href="https://docs.jabref.org/#the-data-format-of-jabref-is-bib-la-tex"
          >
            simple text-based file format
          </a>
          with no vendor lock-in.
        </p>
        <p class="text-xl font-light text-center py-4">
          Created by researchers, for researchers.
        </p>
        <p class="text-justify">
          JabRef is developed and maintained by a multidisciplinary
          <n-popover trigger="hover">
            <template #trigger>
              <n-button text>core team</n-button>
            </template>
            <div class="px-4 py-1">
              <ul
                v-for="member in maintainers"
                :key="member"
                class="list-disc"
              >
                <li class="text-sm">
                  {{ member }}
                </li>
              </ul>
            </div>
          </n-popover>
          of PhD students, postdocs, and researchers in industry who work on
          JabRef in their free time. Without the support of numerous volunteers,
          none of this would have been possible. We welcome anyone who would
          like to contribute to be part of an active user and developer
          community!
          <!--The development and operating costs are entirely funded by
          individual donations.-->
        </p>
      </div>
      <div class="flex flex-row flex-wrap lg:flex-nowrap pt-6 lg:pt-12">
        <div
          class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink flex-grow break-words text-center py-6 md:px-6 max-w-prose"
        >
          <n-button
            text
            type="primary"
            class="text-xl mx-auto text-primary-500"
          >
            <a
              href="https://docs.jabref.org/faq/faqcontributing#i-am-not-a-programmer"
            >
              <FontAwesomeIcon
                icon="heart"
                size="3x"
              />
              <h4 class="text-2xl mb-3">Contribute</h4>
            </a>
          </n-button>
          <h5 class="pb-2 text-xl">Help us build JabRef</h5>
          <p>
            You do not need to be a developer to improve the documentation,
            translate the user interface and help with support.
          </p>
          <t-nuxtlink
            href="https://docs.jabref.org/contributing"
            class="pt-4 text-primary-500 hover:text-primary-600"
          >
            Learn how to help
          </t-nuxtlink>
        </div>
        <div
          class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink flex-grow break-words text-center py-6 md:px-6 max-w-prose"
        >
          <n-button
            text
            type="primary"
            class="text-xl mx-auto text-primary-500"
          >
            <a href="https://github.com/JabRef/jabref/wiki/Donations">
              <FontAwesomeIcon
                icon="gift"
                size="3x"
              />
              <h4 class="text-2xl mb-3">Donate</h4>
            </a>
          </n-button>
          <h5 class="pb-2 text-xl">Support the development</h5>
          <p>
            Help us pay for project development and operating costs so that we
            can continue to innovate. Donations keep us going.
          </p>
          <t-nuxtlink
            href="https://github.com/JabRef/jabref/wiki/Donations"
            class="pt-4 text-primary-500 hover:text-primary-600"
          >
            Donate
          </t-nuxtlink>
        </div>
        <div
          class="lg:min-w-0 mx-auto flex flex-col flex-no-shrink flex-grow break-words text-center py-6 md:px-6 max-w-prose"
        >
          <n-button
            text
            type="primary"
            class="text-xl mx-auto text-primary-500"
          >
            <a href="https://github.com/JabRef/jabref">
              <FontAwesomeIcon
                icon="laptop-code"
                size="3x"
              />
              <h4 class="text-2xl mb-3">Develop</h4>
            </a>
          </n-button>
          <h5 class="pb-2 text-xl">Make JabRef even better</h5>
          <p>
            JabRef is and always will be 100% free and open-source. Contribute
            new features and shape the future of JabRef.
          </p>
          <t-nuxtlink
            href="https://github.com/JabRef/jabref"
            class="pt-4 text-primary-500 hover:text-primary-600"
          >
            Develop via GitHub
          </t-nuxtlink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Ref } from 'vue'

const // @ts-expect-error: https://github.com/nuxt/framework/issues/6910
  { data: maintainers }: { data: Ref<string[]> } = await useFetch<string>(
    'https://raw.githubusercontent.com/JabRef/jabref/main/MAINTAINERS',
    {
      // @ts-expect-error: https://github.com/nuxt/framework/issues/6910
      transform: (data) =>
        data.split('\n').filter((member) => member.length > 0),
    }
  )
</script>
