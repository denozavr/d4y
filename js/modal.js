'use strict';

var doc = document;
var modalGdpr = doc.querySelector('.modal-gdpr');
var closeModal = doc.querySelector('.modal-gdpr .modal-close');

setTimeout(() => {
  if (modalGdpr) {
    modalGdpr.classList.remove('hidden');

    closeModal.addEventListener('click', function () {
      modalGdpr.classList.add('hidden');
    });

  }
}, 5000);


